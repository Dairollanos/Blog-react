import { useAuthContext } from "../../contexts/AuthContext";
import { Button, Alert } from "antd";
import { useHistory } from "react-router";
import { useState } from "react";

const PerfilInfo = () => {
  const { CurrentUser, logout } = useAuthContext();
  const [Error, setError] = useState(false);
  const history = useHistory();
  const handleLogout = async function () {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError(true);
    }
  };
  const handleUpdate = async function () {
    history.push("/perfil-actualizar");
  };
  return (
    <div className="perfil">
      <h1>Mi perfil</h1>
      {Error && (
        <Alert
          message="Error"
          description="Algo salio mal, no se pudo cerrar la sesion."
          type="error"
        />
      )}{" "}
      {CurrentUser.displayName && (
        <div>
          <h3>
            Nombre: <strong>{CurrentUser.displayName}</strong>
          </h3>
          <img
            src={CurrentUser.photoURL}
            alt="perfil"
            className="photo-perfil"
          />
        </div>
      )}
      <br />
      <h3>
        Email: <strong>{CurrentUser.email}</strong>
      </h3>
      <Button
        type="primary"
        className="login-form-button"
        onClick={handleLogout}
      >
        Cerrar Sesiòn
      </Button>
      {!CurrentUser.displayName && (
        <Button
          type="primary"
          className="login-form-button"
          onClick={handleUpdate}
        >
          Actualizar e-mail
        </Button>
      )}
    </div>
  );
};

export default PerfilInfo;
