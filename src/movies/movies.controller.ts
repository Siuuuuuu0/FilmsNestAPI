import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '@prisma/client';
import { MovieReturnType } from './movies.service';


@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(
    @Query('title') title?: string,
    @Query('releaseYear') releaseYear?: string,
    @Query('directorId') directorId?: string,
    @Query('actorIds') actorIds?: string[]
  ): Promise<MovieReturnType[]> {
    const parsedReleaseYear = releaseYear ? parseInt(releaseYear, 10) : undefined;
    const parsedDirectorId = directorId ? parseInt(directorId, 10) : undefined;
    const parsedActorIds = actorIds ? actorIds.map(id => parseInt(id, 10)) : undefined;

    const movies = await this.moviesService.findAll({
      title,
      releaseYear: parsedReleaseYear,
      directorId: parsedDirectorId,
      actorIds: parsedActorIds,
    });

    return movies;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findOne(+id);
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

