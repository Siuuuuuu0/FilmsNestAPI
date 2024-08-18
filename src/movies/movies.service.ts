import { Injectable } from '@nestjs/common';
import { Movie, Prisma, Director, Actor } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

export type MovieReturnType = {
  id: number,
  title: string,
  releaseYear: number,
  director : Director, 
  actors: Actor[]
}

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll(filters: { title?: string; releaseYear?: number; directorId?: number; actorIds?: number[] }): Promise<MovieReturnType[]> {
    const { title, releaseYear, directorId, actorIds } = filters;

    const movies = await this.prisma.movie.findMany({
      where: {
        title: title ? { contains: title, mode: 'insensitive' } : undefined,
        releaseYear,
        directorId,
        actors: actorIds && actorIds.length > 0 ? { some: { actorId: { in: actorIds } } } : undefined,
      },
      include: { actors: true, director: true },
    });
    const response = await Promise.all(movies.map(async movie => {
      const actors = await Promise.all(movie.actors.map(async actor => {
        return await this.prisma.actor.findUnique({ where: { id: actor.actorId } });
      }));
      return {
        id: movie.id,
        title: movie.title,
        releaseYear: movie.releaseYear,
        director: movie.director,
        actors: actors,  
      };
    }));
    return response;
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
