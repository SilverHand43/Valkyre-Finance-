import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Ip,
	Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Get('has-users')
	hasUsers() {
		return this.authService.hasRegisteredUsers();
	}

	@Public()
	@Post('register')
	register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() dto: LoginDto, @Ip() ip: string) {
		return this.authService.login(dto, ip);
	}

	@HttpCode(HttpStatus.OK)
	@Public()
	@Post('refresh')
	refresh(@Body() dto: RefreshTokenDto) {
		return this.authService.refresh(dto);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('forgot-password')
	forgotPassword(@Body() dto: ForgotPasswordDto) {
		return this.authService.forgotPassword(dto);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('reset-password')
	resetPassword(@Body() dto: ResetPasswordDto) {
		return this.authService.resetPasswordWithToken(dto);
	}

	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@Post('change-password')
	changePassword(@CurrentUser() user: RequestUser, @Body() dto: ChangePasswordDto) {
		return this.authService.changePassword(user, dto);
	}
}
