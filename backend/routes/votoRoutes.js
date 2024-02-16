import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Voto from '../models/votoModel.js';
import { isAuth } from '../util.js';

const votoRouter = express.Router();

votoRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newVoto = new Voto({
      dni_candidato: req.body.dni_candidato,
      user: req.user._id,
    });

    const voto = await newVoto.save();
    res.status(201).send({ message: 'Su voto se ha registrado', voto });
  })
);

export default votoRouter;
