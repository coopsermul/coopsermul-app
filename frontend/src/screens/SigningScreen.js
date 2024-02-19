import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SigninScreen() {
  const [countdown, setCountdown] = useState(10);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visualización del formulario
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  console.log('User info from local storage:', userInfo); // Agregar este console.log

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        dni,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      const nextUrl = data.isVoted
        ? `/done?userId=${data._id}`
        : `/home?userId=${data._id}`;
      navigate(nextUrl);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Mostrar el formulario cuando termine el conteo
    setTimeout(() => {
      setShowForm(true);
      clearInterval(interval); // Detener el intervalo una vez que el conteo ha terminado
    }, countdown * 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const checkDashboard = async (e) => {
    e.preventDefault();
    try {
      navigate('/dashboard'); // Navegar solo si selectedDNI está definido
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>
      <h1 className="my-3">Iniciar Sesion</h1>
      {countdown > 0 && (
        <p>Las elecciones inician en {countdown} segundos...</p>
      )}
      {showForm && ( // Renderizar el formulario solo cuando showForm sea true
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="dni">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="dni"
              required
              onChange={(e) => setDni(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3 d-flex justify-content-between">
            <Button type="submit">Iniciar Sesión</Button>
            <Button variant="secondary" onClick={checkDashboard}>
              Dashboard
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
}
