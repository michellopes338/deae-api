import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SelectablesService } from './selectables.service';

@Injectable()
export class LocalService extends SelectablesService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.local);
  }
}
