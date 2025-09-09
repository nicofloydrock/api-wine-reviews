import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WineController } from './wine-reviews.controller';
import { WineService } from './wine-reviews.service';
import { Wine, WineSchema } from './schemas/wine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wine.name, schema: WineSchema }])
  ],
  controllers: [WineController],
  providers: [WineService],
  exports: [WineService],
})
export class WineModule {}