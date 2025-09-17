import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async payWithKaspi(bookingId: number): Promise<boolean> {
    // Здесь должна быть интеграция с реальным Kaspi API
    // Для примера — просто меняем статус бронирования
    const booking = await this.findBookingById(bookingId);
    if (!booking) return false;
    booking.paymentStatus = 'paid';
    await this.saveBooking(booking); // сохранение в БД
    return true;
  }
}

async updateBooking(bookingId: number, seatsBooked: number) {
  const booking = await this.prisma.booking.update({
    where: { id: bookingId },
    data: { seatsBooked },
  });

  async updateBooking(bookingId: number, seatsBooked: number) {
  const booking = await this.prisma.booking.update({
    where: { id: bookingId },
    data: { seatsBooked },
  });
    
  async createBooking(dto: { tripId: number; passengerId: number; seatsBooked: number; paymentMethod: string }) {
    const { tripId, passengerId, seatsBooked, paymentMethod } = dto;
    if (seatsBooked <= 0) throw new BadRequestException('seatsBooked must be > 0');

    return await this.prisma.$transaction(async (prisma) => {
      const trip = await prisma.trip.findUnique({ where: { id: tripId } });
      if (!trip) throw new BadRequestException('Trip not found');
      if (trip.seatsAvailable < seatsBooked) throw new BadRequestException('Not enough seats');

      await prisma.trip.update({
        where: { id: tripId },
        data: { seatsAvailable: trip.seatsAvailable - seatsBooked }
      });

      async cancelBooking(bookingId: number) {
  const booking = await this.prisma.booking.delete({
    where: { id: bookingId },
  });

  // создаём уведомление для пассажира
  await this.prisma.notification.create({
    data: {
      userId: booking.userId,
      message: `Ваше бронирование на поездку ${booking.from} → ${booking.to} было отменено.`,
    },
  });

  // уведомляем водителя
  if (booking.driverId) {
    await this.prisma.notification.create({
      data: {
        driverId: booking.driverId,
        message: `Бронирование пассажира на поездку ${booking.from} → ${booking.to} отменено.`,
      },
    });
  }

  return booking;
}
      const totalPrice = (trip.pricePerSeat || 0) * seatsBooked;

      const booking = await prisma.booking.create({
        data: {
          tripId,
          passengerId,
          seatsBooked,
          totalPrice,
          paymentMethod,
          paymentStatus: paymentMethod === 'kaspi' ? 'pending' : 'pending',
          status: paymentMethod === 'kaspi' ? 'reserved' : 'reserved'
        }
      });

      return { booking };
    });
  }
}
