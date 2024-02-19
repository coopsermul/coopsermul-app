import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      dni: '01234567',
      nombre: 'Adiministrador',
      email: 'admin@example.com',
      password: '123456',
      isAdmin: true,
      isVoted: false,
    },
    {
      dni: '09876543',
      nombre: 'User 3',
      email: '',
      password: '123456',
      isAdmin: false,
      isVoted: false,
    },
  ],
  candidatos: [
    {
      //_id: '1',
      nombre: 'Panchiploki',
      dni: '12345678',
      sede: 'Lima',
      //image: 'images/p3.jpeg',
    },
    {
      //_id: '2',
      nombre: 'Luchiploki',
      dni: '23456789',
      sede: 'Lima',
      //image: 'images/p2.jpeg',
    },
    {
      //_id: '3',
      nombre: 'Charriploki',
      dni: '34567891',
      sede: 'Lima',
      //image: 'images/p3.jpeg',
    },
  ],
};

export default data;
