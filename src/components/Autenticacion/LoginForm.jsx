import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";

const LoginForm = () => {
  const { login } = useAuthContext();
  const [Error, setError] = useState(false);
  const history = useHistory();
  const onFinish = async ({ email, password }) => {
    try {
      await login(email, password);
      history.push("/");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="login">
      <h1>ACCEDER</h1>
      {Error && (
        <Alert
          message="Error"
          description="El usuario o la contraseña son incorrectas."
          type="error"
        />
      )}
      <br />
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
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
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Correo Electronico"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su contraseña!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Acceder
          </Button>
          O <Link to="/registrar">REGISTRAR</Link>
        </Form.Item>
        <Form.Item>
          <Link to="/recuperar-contraseña">¿Olvidaste tu contraseña?</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
