import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../util.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ dni: req.body.dni });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          dni: user.dni,
          nombre: user.nombre,
          email: user.email,
          dni_candidato: user.dni_candidato,
          isAdmin: user.isAdmin,
          isVoted: user.isVoted,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'DNI o password incorrectos' });
  })
);

userRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isVoted = Boolean(req.body.isVoted);
      const updatedUser = await user.save();
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
