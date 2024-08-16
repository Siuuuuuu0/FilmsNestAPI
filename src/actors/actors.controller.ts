import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from '@prisma/client';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}

  @Get()
  async findAll(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Actor | null> {
    return this.actorService.findOne(id);
  }

  @Post()
  async create(@Body() data: { first_name: string; last_name: string }): Promise<Actor> {
    return this.actorService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: { first_name?: string; last_name?: string },
  ): Promise<Actor> {
    return this.actorService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Actor> {
    return this.actorService.delete(id);
  }
}

