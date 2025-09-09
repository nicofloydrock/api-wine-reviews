import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { WineModule } from './wine-reviews/wine-reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
        MongooseModule.forRoot('mongodb+srv://wine-reviews:wine-reviews240532@cluster01-nicohaze.ypqshe8.mongodb.net/wine-reviews?retryWrites=true&w=majority&appName=Cluster01-NicoHaze'),

    WineModule,
  ],
})
export class AppModule {}