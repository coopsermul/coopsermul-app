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
  const [countdown, setCountdown] = useState(0);
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
    const targetDate = new Date('2024-02-24T08:00:00'); // Fecha y hora objetivo (ejemplo)
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime();
    const secondsDifference = Math.ceil(difference / 1000);

    setCountdown(secondsDifference);

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Mostrar el formulario cuando termine el conteo
    setTimeout(() => {
      setShowForm(true);
      clearInterval(interval); // Detener el intervalo una vez que el conteo ha terminado
    }, secondsDifference * 1000);

    return () => clearInterval(interval);
  }, []);

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

  // Función para formatear el tiempo restante en formato HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container className="small-container" class="login">
      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>
      <h1 className="my-3">Proximamente..!!!</h1>
      {countdown > 0 && (
        <p>
          Votaciones Feb.2024 coopsermul 7 de Agosto inician en:{' '}
          {formatTime(countdown)}
        </p>
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
            <Button variant="success" type="submit">
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
}
