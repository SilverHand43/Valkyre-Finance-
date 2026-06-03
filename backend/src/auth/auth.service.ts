import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { UserRole, AuditAction } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestUser } from '../common/interfaces/request-user.interface';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly auditLogService: AuditLogService,
	) {}

	async hasRegisteredUsers() {
		const totalUsers = await this.usersService.countUsers();
		return {
			hasUsers: totalUsers > 0,
			totalUsers,
		};
	}

	async register(dto: RegisterDto) {
		const existing = await this.usersService.findByEmail(dto.email);
		if (existing) {
			throw new BadRequestException('E-mail já está em uso.');
		}

		const passwordHash = await hash(dto.password, 10);
		const user = await this.usersService.create({
			...dto,
			password: passwordHash,
			role: dto.role ?? UserRole.OWNER,
		});

		const tokens = await this.generateTokens(user.id, user.companyId, user.role, user.email);
		await this.saveRefreshToken(user.id, tokens.refreshToken);

		return {
			user: this.sanitizeUser(user),
			...tokens,
		};
	}

	async login(dto: LoginDto, ip?: string) {
		const user = await this.usersService.findByEmail(dto.email);
		if (!user || !user.active) {
			throw new UnauthorizedException('Credenciais inválidas.');
		}

		const valid = await compare(dto.password, user.password);
		if (!valid) {
			throw new UnauthorizedException('Credenciais inválidas.');
		}

		const tokens = await this.generateTokens(user.id, user.companyId, user.role, user.email);
		await this.saveRefreshToken(user.id, tokens.refreshToken);

		await this.auditLogService.register({
			companyId: user.companyId,
			userId: user.id,
			action: AuditAction.LOGIN,
			entity: 'Auth',
			entityId: user.id,
			ip,
		});

		return {
			user: this.sanitizeUser(user),
			...tokens,
		};
	}

	async refresh(dto: RefreshTokenDto) {
		let payload: RequestUser;
		try {
			payload = await this.jwtService.verifyAsync<RequestUser>(dto.refreshToken, {
				secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
			});
		} catch {
			throw new UnauthorizedException('Refresh token inválido.');
		}

		const user = await this.usersService.findById(payload.sub);
		if (!user || !user.refreshTokenHash) {
			throw new UnauthorizedException('Refresh token inválido.');
		}

		const valid = await compare(dto.refreshToken, user.refreshTokenHash);
		if (!valid) {
			throw new UnauthorizedException('Refresh token inválido.');
		}

		const tokens = await this.generateTokens(user.id, user.companyId, user.role, user.email);
		await this.saveRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}

	async forgotPassword(dto: ForgotPasswordDto) {
		const user = await this.usersService.findByEmail(dto.email);
		if (!user) {
			return { message: 'Se o usuário existir, um token será gerado.' };
		}

		const token = randomBytes(24).toString('hex');
		await this.usersService.update(user.id, {
			resetToken: token,
			resetTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 30),
		});

		return {
			message: 'Token de recuperação gerado (mock).',
			resetToken: token,
		};
	}

	async resetPasswordWithToken(dto: ResetPasswordDto) {
		const target = await this.findByResetToken(dto.token);
		if (!target) {
			throw new BadRequestException('Token inválido ou expirado.');
		}

		await this.usersService.update(target.id, {
			password: await hash(dto.newPassword, 10),
			resetToken: null,
			resetTokenExpiresAt: null,
		});

		return { message: 'Senha redefinida com sucesso.' };
	}

	async changePassword(user: RequestUser, dto: ChangePasswordDto) {
		const dbUser = await this.usersService.findById(user.sub);
		if (!dbUser) {
			throw new UnauthorizedException('Usuário não encontrado.');
		}

		const valid = await compare(dto.currentPassword, dbUser.password);
		if (!valid) {
			throw new UnauthorizedException('Senha atual inválida.');
		}

		await this.usersService.update(dbUser.id, {
			password: await hash(dto.newPassword, 10),
		});

		return { message: 'Senha alterada com sucesso.' };
	}

	private async generateTokens(
		userId: string,
		companyId: string,
		role: UserRole,
		email: string,
	) {
		const payload = { sub: userId, companyId, role, email };
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
			expiresIn:
				(this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m') as any,
		});
		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
			expiresIn:
				(this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d') as any,
		});

		return { accessToken, refreshToken };
	}

	private async saveRefreshToken(userId: string, refreshToken: string) {
		await this.usersService.update(userId, {
			refreshTokenHash: await hash(refreshToken, 10),
		});
	}

	private sanitizeUser(user: {
		id: string;
		companyId: string;
		name: string;
		email: string;
		phone: string;
		role: UserRole;
		active: boolean;
		createdAt: Date;
		updatedAt: Date;
	}) {
		return {
			id: user.id,
			companyId: user.companyId,
			name: user.name,
			email: user.email,
			phone: user.phone,
			role: user.role,
			active: user.active,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}

	private async findByResetToken(token: string) {
		return this.usersService.findByResetToken(token);
	}
}
