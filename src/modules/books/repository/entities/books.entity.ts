import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseEntity } from '@/common/database/decorators/database.decorator';
import { Document } from 'mongoose';

export const BookDBCollection = 'book';

@DatabaseEntity({ collection: BookDBCollection })
export class Book extends Document {
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
  // authorId: AuthorEntity;

  @Prop({ required: true })
    publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);

export type BookDoc = Book;
