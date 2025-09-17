import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from '../auth/decorators/user.decorator';


@Controller('bookings')
export class BookingsController {
constructor(private bookingsService: BookingsService) {}


@UseGuards(JwtAuthGuard)
@Post()
async create(@Body() dto: any, @User() user: any) {
return this.bookingsService.createBooking({ ...dto, passengerId: user.userId });
}
}
