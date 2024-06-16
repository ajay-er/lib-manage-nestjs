import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseEntity } from '@/common/database/decorators/database.decorator';
import type { Document } from 'mongoose';

export const BookDBCollection = 'book';

@DatabaseEntity({ collection: BookDBCollection })
export class BookEntity {
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: String,
  })
    title: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
    description?: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
  // author: AuthorsEntity;

  @Prop({ required: true })
    publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(BookEntity);

export type BookDoc = BookEntity & Document;
