import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TripsModule } from './trips/trips.module';
import { BookingsModule } from './bookings/bookings.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, TripsModule, BookingsModule],
providers: [PrismaService]
})
export class AppModule {}
