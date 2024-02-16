import express from 'express';
import Candidato from '../models/candidatoModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Candidato.deleteMany();
  const createdCandidatos = await Candidato.insertMany(data.candidatos);
  await User.deleteMany();
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdCandidatos, createdUsers });
});
export default seedRouter;
