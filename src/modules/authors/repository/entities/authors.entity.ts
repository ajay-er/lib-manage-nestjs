import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseEntity } from '@/common/database/decorators/database.decorator';
import { Document } from 'mongoose';

export const AuthorDBCollection = 'author';

@DatabaseEntity({ collection: AuthorDBCollection })
export class Author extends Document {
  @Prop({
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 60,
  })
    name: string;

  @Prop({
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 300,
  })
    biography?: string;

  @Prop({
    required: true,
    type: Date,
    validate: {
      validator: (value: Date) => {
        const currentDate = new Date();
        const tenYearsAgo = new Date(
          currentDate.getFullYear() - 10,
          currentDate.getMonth(),
          currentDate.getDate(),
        );
        return value <= tenYearsAgo;
      },
      message: 'Birthdate must be at least 10 years ago',
    },
  })
    birthDate: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

export type AuthorDoc = Author;
