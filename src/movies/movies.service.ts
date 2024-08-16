import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
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
