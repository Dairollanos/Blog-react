import { Button } from "antd";

const ContenidoPost = ({ post, eliminar }) => {
  return (
    <div className="contenido-post">
      {post.map((item) => (
        <div key={item.id} className="post-detalle">
          {" "}
          <h1>{item.titulo}</h1>
          <p>
            <strong>{item.autor}</strong>
          </p>
          <p> {item.contenido} </p>
          <Button type="primary" onClick={eliminar} danger>
            Eliminar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ContenidoPost;
