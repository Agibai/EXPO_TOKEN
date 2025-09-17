import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService {
constructor(private jwt: JwtService, private prisma: PrismaService) {}


async requestOtp(phone: string) {
// TODO: интеграция SMS. Сейчас — только логика create user if not exists
let user = await this.prisma.user.findUnique({ where: { phone } });
if (!user) {
user = await this.prisma.user.create({ data: { phone, role: 'passenger' } });
}
// Вернуть токен подтверждения или сообщение
return { ok: true, message: 'OTP sent (stub)' };
}


async verifyOtp(phone: string, otp: string) {
// Примем любой otp как валидный. Создадим/вернём JWT
let user = await this.prisma.user.findUnique({ where: { phone } });
if (!user) {
user = await this.prisma.user.create({ data: { phone, role: 'passenger' } });
}
const payload = { sub: user.id, phone: user.phone, role: user.role };
const token = this.jwt.sign(payload);
return { accessToken: token, user: { id: user.id, phone: user.phone, role: user.role } };
}


  async validateUser(email: string, pass: string) {
  const user = await this.usersService.findByEmail(email);
  if (user && user.password === pass) {
    // возвращаем роль вместе с токеном
    const { password, ...result } = user;
    return result;
  }
  return null;
}

}
