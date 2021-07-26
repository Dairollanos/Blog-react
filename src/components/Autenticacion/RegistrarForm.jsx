import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const RegistrarForm = () => {
  const { signup } = useAuthContext();
  const [Error, setError] = useState(false);
  const history = useHistory();

  const onFinish = async ({ email, password }) => {
    try {
      await signup(email, password);
      history.push("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="registrar-form">
      <h1>REGISTRAR</h1>
      {Error && (
        <Alert
          message="Error"
          description="Correo o contraseñas no validas."
          type="error"
        />
      )}{" "}
      <br />
      <Form
        name="normal_registration"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="E-mail"
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
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu contraseña!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmar contraseña"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor confirma tu contraseña!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no son iguales!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Registrar
          </Button>
          O <Link to="/login">ACCEDER</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrarForm;
