import mongoose from 'mongoose';

const candidatoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    dni: { type: String, required: true, unique: true },
    sede: { type: String, required: true },
  },
  { timestamps: true }
);

const Candidato = mongoose.model('Candidato', candidatoSchema);
export default Candidato;
