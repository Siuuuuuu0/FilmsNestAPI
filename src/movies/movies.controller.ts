import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '@prisma/client';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Post()
  async create(@Body() movieData: { title: string; releaseYear: number; directorId: number; actorIds: number[] }): Promise<Movie> {
    const { title, releaseYear, directorId, actorIds } = movieData;

    return this.moviesService.create({
      title,
      releaseYear,
      director: { connect: { id: directorId } },
      actors: {
        create: actorIds.map((actorId) => ({ actorId })),
      },
    });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() movieData: { title?: string; releaseYear?: number; directorId?: number; actorIds?: number[] }): Promise<Movie> {
    const { title, releaseYear, directorId, actorIds } = movieData;

    return this.moviesService.update(+id, {
      title,
      releaseYear,
      director: directorId ? { connect: { id: directorId } } : undefined,
      actors: actorIds ? { deleteMany: {}, create: actorIds.map((actorId) => ({ actorId })) } : undefined,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.delete(+id);
  }
}

