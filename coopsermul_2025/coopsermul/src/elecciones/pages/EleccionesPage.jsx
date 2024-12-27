import { Navbar, UsuarioEvent } from '../';
import { useState } from 'react';

const candidates = [
  { id: 1, name: 'Panchiploki' },
  { id: 2, name: 'Luchiploki' },
  { id: 3, name: 'Charriploki' },
  { id: 4, name: 'Lufi' },
  { id: 5, name: 'Lay' },
];

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  tr: {
    transition: 'background-color 0.3s',
  },
  trHover: {
    backgroundColor: '#f5f5f5',
  },
  radio: {
    cursor: 'pointer',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
};

export const EleccionesPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSelect = (id) => {
    setSelectedCandidate(id);
  };

  const handleSave = () => {
    if (selectedCandidate) {
      alert(`Voted for candidate with ID: ${selectedCandidate}`);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Elecciones CoopSermul</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Candidato</th>
              <th style={styles.th}>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                style={{
                  ...styles.tr,
                  ...(hoveredRow === candidate.id ? styles.trHover : {}),
                }}
                onMouseEnter={() => setHoveredRow(candidate.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.td}>{candidate.name}</td>
                <td style={styles.td}>
                  <input
                    type="radio"
                    name="selectCandidate"
                    checked={selectedCandidate === candidate.id}
                    onChange={() => handleSelect(candidate.id)}
                    style={styles.radio}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleSave}
          disabled={!selectedCandidate}
          style={{
            ...styles.button,
            ...(selectedCandidate ? {} : styles.buttonDisabled),
          }}
        >
          Votar
        </button>
      </div>
    </>
  );
};
