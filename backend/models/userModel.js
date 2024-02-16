import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    dni: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dni_candidato: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    isVoted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
