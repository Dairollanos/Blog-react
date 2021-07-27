import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Inicio from "./views/Inicio";
import Detalles from "./views/Detalles";
import Crear from "./views/Crear";
import Login from "./views/Login";
import Registrar from "./views/Registrar";
import RecuperarCont from "./views/RecuperarCont";
import { AuthProvider } from "./contexts/AuthContext";
import Perfil from "./views/Perfil";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ActualizarPerfil from "./views/ActualizarPerfil";
import ActualizarPost from "./views/ActualizarPost";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/registrar" component={Registrar} />
            <PublicRoute
              path="/recuperar-contraseña"
              component={RecuperarCont}
            />
            <PrivateRoute exact path="/" component={Inicio} />
            <PrivateRoute path="/perfil" component={Perfil} />
            <PrivateRoute
              path="/perfil-actualizar"
              component={ActualizarPerfil}
            />
            <PrivateRoute exact path="/post/:id" component={Detalles} />
            <PrivateRoute
              path="/post/actualizar/:id"
              component={ActualizarPost}
            />
            <PrivateRoute path="/crear" component={Crear} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
