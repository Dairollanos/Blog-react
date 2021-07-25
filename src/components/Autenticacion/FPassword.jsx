import { Form, Input, Button, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";

const Fpassword = () => {
  const { resetPassword } = useAuthContext();
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const onFinish = async ({ email }) => {
    try {
      await resetPassword(email);
      setSuccess(true);
      setError(false);
    } catch (error) {
      setError(true);
      setSuccess(false);
    }
  };
  return (
    <div className="reset-password">
      <h1>RECUPERAR CONTRASEÑA</h1>
      {Error && (
        <Alert
          message="Error"
          description="No se pudo enviar el correo para reestablecer contraseña."
          type="error"
        />
      )}
      {Success && (
        <Alert
          message="Exito"
          description="Revisa tu bandeja de correo para poder reestablecer tu contraseña."
          type="success"
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Recuperar
          </Button>{" "}
          <br />
          <Link to="/login">ACCEDER</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Fpassword;
