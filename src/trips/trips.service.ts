import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class TripsService {
constructor(private prisma: PrismaService) {}


async create(dto: any) {
// dto: driverId, startPoint, endPoint, startTime, totalSeats, pricePerSeat, priceFull
const trip = await this.prisma.trip.create({
data: {
driverId: dto.driverId,
startPoint: dto.startPoint,
endPoint: dto.endPoint,
startTime: new Date(dto.startTime),
totalSeats: dto.totalSeats,
seatsAvailable: dto.totalSeats,
pricePerSeat: dto.pricePerSeat,
priceFull: dto.priceFull
}
});
return trip;
}


async find(filters: { from?: string; to?: string }) {
const where: any = { status: 'published' };
if (filters.from) where.startPoint = { contains: filters.from };
if (filters.to) where.endPoint = { contains: filters.to };
return this.prisma.trip.findMany({ where });
}
}
