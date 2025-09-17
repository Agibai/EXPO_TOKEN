@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('me')
  getMyNotifications(@Req() req) {
    return this.notificationsService.getUserNotifications(req.user.userId);
  }

  @Get('driver')
getDriverNotifications(@Req() req) {
  return this.notificationsService.getDriverNotifications(req.user.userId);
}

  @Post(':id/read')
  markRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(+id);
  }
}
