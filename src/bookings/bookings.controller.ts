import { Controller, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  async create(@Body() dto: any) {
    return this.bookingsService.createBooking(dto);
  }
}
