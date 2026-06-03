import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { email } });
	}

	findById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}

	findByResetToken(token: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				resetToken: token,
				resetTokenExpiresAt: { gt: new Date() },
			},
		});
	}

	create(data: {
		companyId: string;
		name: string;
		email: string;
		password: string;
		phone: string;
		role?: UserRole;
	}): Promise<User> {
		return this.prisma.user.create({
			data: {
				...data,
				role: data.role ?? UserRole.EMPLOYEE,
			},
		});
	}

	update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	countUsers(): Promise<number> {
		return this.prisma.user.count();
	}
}
