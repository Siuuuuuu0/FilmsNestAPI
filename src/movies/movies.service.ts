import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll(filters: { title?: string; releaseYear?: number; directorId?: number; actorIds?: number[] }): Promise<Movie[]> {
    const { title, releaseYear, directorId, actorIds } = filters;

    return this.prisma.movie.findMany({
      where: {
        title: title ? { contains: title, mode: 'insensitive' } : undefined,
        releaseYear,
        directorId,
        actors: actorIds && actorIds.length > 0 ? { some: { actorId: { in: actorIds } } } : undefined,
      },
      include: { actors: true, director: true },
    });
  }

  async findOne(id: number): Promise<Movie | null> {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        director: true,
        actors: {
          include: {
            Actor: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.MovieCreateInput): Promise<Movie> {
    return this.prisma.movie.create({
      data,
    });
  }

  async update(id: number, data: Prisma.MovieUpdateInput): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Movie> {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}
