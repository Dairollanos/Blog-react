import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { database } from "../../firebase";
import ContenidoPost from "./ContenidoPost";

const DetallesPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  const eliminar = function () {
    database.ref("posts/" + id).remove();
    history.push("/");
  };

  useEffect(() => {
    let mounted = true;
    var usuariosRegistrados = database.ref("posts/" + id);
    usuariosRegistrados.on("value", (snapshot) => {
      let data = snapshot.val();
      if (mounted) {
        if (data) {
          setPost([data]);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      }
    });
    return () => (mounted = false);
  }, [id]);

  return (
    <div>
      <div className="detalles">
        {loading ? (
          <h1>Cargando ...</h1>
        ) : error ? (
          <h1>Ha ocurrido un errror, no se pudieron encontrar datos</h1>
        ) : (
          <ContenidoPost post={post} eliminar={eliminar} />
        )}
      </div>
    </div>
  );
};

export default DetallesPost;
