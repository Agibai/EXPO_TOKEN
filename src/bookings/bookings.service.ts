import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

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
