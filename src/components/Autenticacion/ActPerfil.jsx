import { Form, Input, Button, Alert } from "antd";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const ActPerfil = () => {
  const { CurrentUser, updateEmail } = useAuthContext();
  const [Error, setError] = useState(false);
  const history = useHistory();

  const onFinish = async ({ email }) => {
    if (email !== CurrentUser.email) {
      try {
        await updateEmail(email);
        history.push("/");
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  };
  return (
    <div className="update-perfil">
      <h1>ACTUALIZAR E-MAil</h1>
      {Error && (
        <Alert
          message="Error"
          description="Error al actualizar el correo."
          type="error"
        />
      )}
      <br />
      <Form
        name="normal_registration"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Nuevo E-mail"
          rules={[
            {
              type: "email",
              message: "No es un e-mail valido!",
            },
            {
              required: true,
              message: "Por favor ingresa tu correo!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Actualizar correo
          </Button>
          O <Link to="/">CANCELAR</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ActPerfil;
