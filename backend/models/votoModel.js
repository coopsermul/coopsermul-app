import mongoose from 'mongoose';

const votoSchema = new mongoose.Schema(
  {
    dni_candidato: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Voto = mongoose.model('Voto', votoSchema);
export default Voto;
