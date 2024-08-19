import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Actor } from '@prisma/client';

@Injectable()
export class ActorsService {
  constructor(private prisma: DatabaseService) {}

  async findAll(filters:{last_name?: string}): Promise<Actor[]> {
    return this.prisma.actor.findMany({
      where: {
          last_name: {
              contains: filters.last_name, 
              mode: 'insensitive', 
          },
      },
      include: { movies: true },
  });

  }

  async findOne(id: number): Promise<Actor | null> {
    return this.prisma.actor.findUnique({
      where: { id },
      include: { movies: true },
    });
  }

  async create(data: { first_name: string; last_name: string }): Promise<Actor> {
    return this.prisma.actor.create({
      data,
    });
  }

  async update(id: number, data: { first_name?: string; last_name?: string }): Promise<Actor> {
    return this.prisma.actor.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Actor> {
    return this.prisma.actor.delete({
      where: { id },
    });
  }
}

