import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Controller, Post, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from '../auth/decorators/user.decorator';


@Controller('bookings')
export class BookingsController {
constructor(private bookingsService: BookingsService) {}

  
@Controller('bookings')
export class BookingsController {
constructor(private readonly bookingsService: BookingsService) {}


@Post(':id/pay-kaspi')
async payKaspi(@Param('id') id: string) {
    // эмуляция запроса к Kaspi API
    const success = await this.bookingsService.payWithKaspi(+id);
    if (!success) {
      throw new Error('Ошибка оплаты Kaspi');
    }
    return { message: 'Оплата прошла успешно!' };
  }
}
@UseGuards(JwtAuthGuard)
@Post()
async create(@Body() dto: any, @User() user: any) {
return this.bookingsService.createBooking({ ...dto, passengerId: user.userId });
}
}
