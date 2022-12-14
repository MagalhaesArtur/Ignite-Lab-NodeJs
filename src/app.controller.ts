import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'crypto';
import { Body } from '@nestjs/common/decorators';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(): any {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, recipientUserId, category } = body;
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content: content,
        category: category,
        recipientUserId: recipientUserId,
      },
    });
  }
}
