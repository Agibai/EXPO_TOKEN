import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TripsService } from './trips.service';


@Controller('trips')
export class TripsController {
constructor(private tripsService: TripsService) {}


@Post()
async createTrip(@Body() dto: any) {
return this.tripsService.create(dto);
}


@Get()
async list(@Query('from') from: string, @Query('to') to: string) {
return this.tripsService.find({ from, to });
}
}
