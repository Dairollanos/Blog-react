import { Input, Form, Button, Alert } from "antd";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { database } from "../../firebase";

const ActualizarContenido = () => {
  const { TextArea } = Input;
  const [Error, setError] = useState(false);
  const [post, setPost] = useState([]);
  const historial = useHistory();
  const { id } = useParams();

  const Guardar = async function ({ titulo, contenido }) {
    try {
      await database.ref("posts/" + id).update({
        titulo: titulo,
        contenido: contenido,
      });
    } catch (error) {
      setError(true);
    }
    historial.push("/");
  };

  useEffect(() => {
    let mounted = true;
    var usuariosRegistrados = database.ref("posts/" + id);
    usuariosRegistrados.on("value", (snapshot) => {
      let data = snapshot.val();
      if (mounted) {
        if (data) {
          setPost([data]);
        } else {
          setError(true);
        }
      }
    });
    return () => (mounted = false);
  }, [id]);

  return (
    <div className="update-post">
      <h1>Actualizar post</h1>
      {Error && (
        <Alert
          message="Error"
          description="Error al actualizar el post."
          type="error"
        />
      )}
      {post.map((item) => (
        <Form
          onFinish={Guardar}
          layout="vertical"
          requiredMark={false}
          initialValues={{
            titulo: item.titulo,
            contenido: item.contenido,
          }}
        >
          <Form.Item label="Titulo" name="titulo">
            <Input />
          </Form.Item>
          <Form.Item label="Contenido" name="contenido">
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Agregar
            </Button>
          </Form.Item>
        </Form>
      ))}
    </div>
  );
};

export default ActualizarContenido;
