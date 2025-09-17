import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';


@Module({
imports: [
ConfigModule,
JwtModule.registerAsync({
imports: [ConfigModule],
inject: [ConfigService],
useFactory: (cs: ConfigService) => ({ secret: cs.get('JWT_SECRET') || 'secret', signOptions: { expiresIn: '7d' } })
})
],
controllers: [AuthController],
providers: [AuthService, PrismaService, JwtStrategy],
exports: [AuthService]
})
export class AuthModule {}
