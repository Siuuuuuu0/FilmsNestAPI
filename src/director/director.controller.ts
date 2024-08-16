import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DirectorService } from './director.service';
import { Director } from '@prisma/client';

@Controller('directors')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Get()
  async findAll(): Promise<Director[]> {
    return this.directorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Director | null> {
    return this.directorService.findOne(id);
  }

  @Post()
  async create(@Body() data: { first_name: string; last_name: string }): Promise<Director> {
    return this.directorService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: { first_name?: string; last_name?: string },
  ): Promise<Director> {
    return this.directorService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Director> {
    return this.directorService.delete(id);
  }
}

