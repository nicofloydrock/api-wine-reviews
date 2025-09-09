import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { WineService } from './wine-reviews.service';
import { CreateWineDto, FilterWineDto } from './dto/create-wine.dto';

@ApiTags('wines')
@Controller('wines')
export class WineController {
  constructor(private readonly wineService: WineService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wine review' })
  @ApiResponse({ status: 201, description: 'Wine review created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createWineDto: CreateWineDto) {
    return this.wineService.create(createWineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wine reviews with filters and pagination' })
  @ApiResponse({ status: 200, description: 'List of wine reviews' })
  findAll(@Query() filterDto: FilterWineDto) {
    return this.wineService.findAll(filterDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get general statistics about wines' })
  @ApiResponse({ status: 200, description: 'General wine statistics' })
  getStats() {
    return this.wineService.getStats();
  }

  @Get('stats/countries')
  @ApiOperation({ summary: 'Get statistics by country' })
  @ApiResponse({ status: 200, description: 'Wine statistics by country' })
  getCountriesStats() {
    return this.wineService.getCountriesStats();
  }

  @Get('stats/varieties')
  @ApiOperation({ summary: 'Get statistics by wine variety' })
  @ApiResponse({ status: 200, description: 'Wine statistics by variety' })
  getVarietiesStats() {
    return this.wineService.getVarietiesStats();
  }

  @Get('top-rated')
  @ApiOperation({ summary: 'Get top-rated wines' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Top-rated wines' })
  getTopRatedWines(@Query('limit') limit: string = '10') {
    return this.wineService.getTopRatedWines(parseInt(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wine review by ID' })
  @ApiResponse({ status: 200, description: 'Wine review found' })
  @ApiResponse({ status: 404, description: 'Wine review not found' })
  findOne(@Param('id') id: string) {
    return this.wineService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a wine review' })
  @ApiResponse({ status: 200, description: 'Wine review updated successfully' })
  @ApiResponse({ status: 404, description: 'Wine review not found' })
  update(@Param('id') id: string, @Body() updateWineDto: Partial<CreateWineDto>) {
    return this.wineService.update(id, updateWineDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a wine review' })
  @ApiResponse({ status: 204, description: 'Wine review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Wine review not found' })
  remove(@Param('id') id: string) {
    return this.wineService.remove(id);
  }
}