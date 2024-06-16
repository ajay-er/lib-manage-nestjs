import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseEntity } from '@/common/database/decorators/database.decorator';
import mongoose, { Document, Types } from 'mongoose';

export const BookDBCollection = 'book';

@DatabaseEntity({ collection: BookDBCollection })
export class Book extends Document {
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: String,
    minlength: 1,
    maxlength: 60,
  })
    title: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
    maxlength: 300,
  })
    description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
    authorId: Types.ObjectId;

  @Prop({
    required: true,
    validate: {
      validator: (value: Date) => value <= new Date(),
      message: 'Published date must be in the past or present',
    },
  })
    publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);

export type BookDoc = Book;
