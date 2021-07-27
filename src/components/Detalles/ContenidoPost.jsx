import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const ContenidoPost = ({ post, eliminar }) => {
  const { CurrentUser } = useAuthContext();

  const PostOwner = function () {
    return post[0].autor === CurrentUser.email;
  };

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
          {PostOwner() && (
            <div className="contenido-post-owner">
              <Button type="primary" onClick={eliminar} danger>
                Eliminar
              </Button>
              <Link to={`/post/actualizar/${item.id}`}>
                <Button type="primary" className="edit-post">
                  Editar
                </Button>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContenidoPost;
