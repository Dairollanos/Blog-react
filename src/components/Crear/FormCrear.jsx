import { Input, Form, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { database } from "../../firebase";

const FormCrear = () => {
  const { TextArea } = Input;
  const { CurrentUser } = useAuthContext();
  const historial = useHistory();

  const Guardar = function ({ titulo, contenido }) {
    let newPostID = database.ref().child("posts").push().key;
    database.ref("posts/" + newPostID).set({
      id: newPostID,
      titulo: titulo,
      autor: CurrentUser.email,
      contenido: contenido,
    });
    historial.push("/");
  };

  return (
    <div className="form-crear">
      <h1>CREAR NUEVO BLOG</h1>
      <Form onFinish={Guardar} layout="vertical" requiredMark={false}>
        <Form.Item
          label="Titulo"
          name="titulo"
          rules={[{ required: true, message: "Por favor, agregue un titulo!" }]}
        >
          <Input placeholder="Titulo" />
        </Form.Item>
        <Form.Item
          label="Contenido"
          name="contenido"
          rules={[
            {
              required: true,
              message: "Por favor, agregue el contenido del blog!",
            },
          ]}
        >
          <TextArea rows={6} placeholder="Contenido" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Agregar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCrear;
