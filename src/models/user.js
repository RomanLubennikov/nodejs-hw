import { Schema, model } from 'mongoose';
const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true },
);
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});
export const User = model('User', userSchema);
