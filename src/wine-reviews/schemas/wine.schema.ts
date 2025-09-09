import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WineDocument = Wine & Document;

@Schema({ collection: 'reviews' })
export class Wine {
  @Prop({ required: true })
  points: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  taster_name?: string;

  @Prop()
  taster_twitter_handle?: string;

  @Prop()
  price?: number;

  @Prop()
  designation?: string;

  @Prop({ required: true })
  variety: string;

  @Prop()
  region_1?: string;

  @Prop()
  region_2?: string;

  @Prop()
  province?: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  winery: string;
}

export const WineSchema = SchemaFactory.createForClass(Wine);
