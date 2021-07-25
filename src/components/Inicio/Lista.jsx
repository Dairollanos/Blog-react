import { database } from "../../firebase";
import { useEffect, useState } from "react";

import ListaPosts from "./ListaPosts";

const Lista = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let mounted = true;
    var usuariosRegistrados = database.ref("posts/");
    usuariosRegistrados.on("value", (snapshot) => {
      let data = snapshot.val();
      if (mounted) {
        if (data) {
          for (const key in data) {
            setDatos((prev) => [...prev, data[key]]);
          }
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <div className="Lista">
      {loading ? (
        <h1>Cargando ...</h1>
      ) : error ? (
        <h1>Ha ocurrido un errror, no se pudieron encontrar datos</h1>
      ) : (
        <ListaPosts datos={datos} />
      )}
    </div>
  );
};

export default Lista;
