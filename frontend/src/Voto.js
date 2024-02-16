import { createContext, useReducer } from 'react';

export const Voto = createContext();

const initialState = {
  eleccion: {
    elecciones: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'VOTO_ADD':
      //add voto
      return {
        ...state.eleccion,
        elecciones: [...state.eleccion.elecciones, action.payload],
      };
    default:
      return state;
  }
}

export function VotoProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Voto.Provider value={value}>{props.children} </Voto.Provider>;
}
