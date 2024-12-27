import { useSelector } from 'react-redux';

export const useUiStore = () => {
  const { isCandidatoSelected } = useSelector((state) => state.ui);

  return {
    //* Propiedades
    isCandidatoSelected,

    //* Metodos
  };
};
