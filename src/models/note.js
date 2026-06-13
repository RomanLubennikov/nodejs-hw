import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';
const noteSchema = new Schema(
  {
    title: {
      trim: true,
      type: String,
      required: true,
    },
    content: {
      trim: true,
      default: '',
      type: String,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
noteSchema.index({ tag: 1 });
export const Note = model('Note', noteSchema);
