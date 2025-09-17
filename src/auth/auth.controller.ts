import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}


@Post('request-otp')
async requestOtp(@Body('phone') phone: string) {
// В реале — отправляем SMS. Здесь — просто заглушка.
return this.authService.requestOtp(phone);
}


@Post('verify-otp')
async verifyOtp(@Body() body: { phone: string; otp: string }) {
// Заглушка: любой OTP принимается
return this.authService.verifyOtp(body.phone, body.otp);
}
}
