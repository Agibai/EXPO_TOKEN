import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from '../auth/decorators/user.decorator';


@Controller('trips')
export class TripsController {
constructor(private tripsService: TripsService) {}


@UseGuards(JwtAuthGuard)
@Post()
async createTrip(@Body() dto: any, @User() user: any) {
// user.userId доступен из токена
return this.tripsService.create({ ...dto, driverId: user.userId });
}


@Get()
async list(@Query('from') from: string, @Query('to') to: string) {
return this.tripsService.find({ from, to });
}
}
