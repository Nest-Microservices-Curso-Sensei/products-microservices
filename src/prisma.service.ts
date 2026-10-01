
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {

  private logger = new Logger('PrismaService');
  
  constructor() {
    super();

    this.logger.log('Database connected');
  }
}

