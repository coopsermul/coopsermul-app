import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Candidato(props) {
  const { candidato } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const addToCartHandler = async (item) => {
    const { data } = await axios.get(`/api/candidatos/${item._id}`);
  };

  return (
    <div>
      <p>{candidato.nombre}</p>
      <Button onClick={() => addToCartHandler(candidato)}>Add to cart</Button>
    </div>
  );
}
export default Candidato;
