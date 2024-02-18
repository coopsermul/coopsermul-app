import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import SigninScreen from './screens/SigningScreen';
import { Store } from './Store';
import GraciasScreen from './screens/GraciasSecreen';
import DoneSecreen from './screens/DoneScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container className="justify-content-between">
              <div>
                <Navbar.Brand>COOP SERMUL 7 DE AGOSTO</Navbar.Brand>
              </div>

              <Nav className="me-auto">
                {userInfo ? (
                  <NavDropdown title={userInfo.nombre} id="basic-nav-dropdown">
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={signoutHandler}
                    >
                      Cerrar Sesion
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/">
                    Iniciar Sesion
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<SigninScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/gracias" element={<GraciasScreen />} />
              <Route path="/done" element={<DoneSecreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
