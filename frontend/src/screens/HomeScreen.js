import { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import { Envelope } from 'react-bootstrap-icons';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, candidatos: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'SELECT_CANDIDATO':
      return { ...state, selectedCandidato: action.payload };
    case 'SELECT_DNI':
      return { ...state, selectedDNI: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

function HomeScreen() {
  const [
    {
      loading,
      error,
      candidatos,
      selectedCandidato,
      selectedDNI,
      loadingCreate,
      loadingUpdate,
    },
    dispatch,
  ] = useReducer(reducer, {
    candidatos: [],
    selectedCandidato: null,
    selectedDNI: null, // Define selectedDNI en el estado inicial
    loading: true,
    error: '',
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { candidato, userInfo } = state;
  const [isVoted] = useState(true);

  console.log('Valor de isVoted:', isVoted);

  const navigate = useNavigate();

  const userId = userInfo && userInfo._id && userInfo._id.toString().trim();

  console.log('Valor de userId:', userId);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/candidatos');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const handleSelectCandidato = (candidatoId, dni) => {
    dispatch({ type: 'SELECT_CANDIDATO', payload: candidatoId });
    dispatch({ type: 'SELECT_DNI', payload: dni }); // Asigna el DNI seleccionado
  };

  const checkoutHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/votos',
        {
          dni_candidato: selectedDNI, // Utiliza selectedDNI en la solicitud POST
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Voto registrado correctamente');

      ctxDispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo');

      navigate('/gracias'); // Navegar solo si selectedDNI está definido
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <Helmet>
        <title>COOP SERMUL</title>
      </Helmet>
      <h1>Candidatos</h1>
      <div className="candidatos">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: '90%' }}>Nombre</th>
                <th style={{ width: '10%' }}>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {candidatos.map((candidato) => (
                <tr key={candidato.id}>
                  <td style={{ width: '90%' }}>
                    <label
                      htmlFor={candidato.dni}
                      onClick={() =>
                        handleSelectCandidato(candidato.id, candidato.dni)
                      }
                    >
                      {candidato.nombre}
                    </label>
                  </td>
                  <td style={{ width: '10%' }}>
                    <input
                      type="radio"
                      id={candidato.dni}
                      name="candidato"
                      value={candidato.dni}
                      checked={selectedCandidato === candidato.id}
                      onChange={() =>
                        handleSelectCandidato(candidato.id, candidato.dni)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="d-grid">
        <Button
          variant="success"
          onClick={checkoutHandler}
          disabled={selectedCandidato === null}
        >
          Votar
        </Button>
      </div>
    </div>
  );
}

export default HomeScreen;
