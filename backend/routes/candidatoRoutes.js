import express from 'express';
import Candidato from '../models/candidatoModel.js';

const candidatoRouter = express.Router();

candidatoRouter.get('/', async (req, res) => {
  const candidatos = await Candidato.find();
  res.send(candidatos);
});

export default candidatoRouter;
