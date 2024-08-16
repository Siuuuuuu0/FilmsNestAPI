import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Director } from '@prisma/client';

@Injectable()
export class DirectorService {
  constructor(private prisma: DatabaseService) {}

  async findAll(): Promise<Director[]> {
    return this.prisma.director.findMany({
      include: { movies: true },
    });
  }

  async findOne(id: number): Promise<Director | null> {
    return this.prisma.director.findUnique({
      where: { id },
      include: { movies: true },
    });
  }

  async create(data: { first_name: string; last_name: string }): Promise<Director> {
    return this.prisma.director.create({
      data,
    });
  }

  async update(id: number, data: { first_name?: string; last_name?: string }): Promise<Director> {
    return this.prisma.director.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Director> {
    return this.prisma.director.delete({
      where: { id },
    });
  }
}

