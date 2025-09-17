@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserNotifications(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(notificationId: number) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  async createNotification(userId: number, message: string) {
    return this.prisma.notification.create({
      data: { userId, message },
    });
  }

  async getDriverNotifications(driverId: number) {
  // уведомления только для водителя
  return this.prisma.notification.findMany({
    where: { driverId },
    orderBy: { createdAt: 'desc' },
  });
}

async createDriverNotification(driverId: number, message: string) {
  return this.prisma.notification.create({
    data: { driverId, message },
  });
}
}
