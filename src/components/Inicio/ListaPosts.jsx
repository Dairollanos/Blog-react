import { Link } from "react-router-dom";
const ListaPosts = ({ datos }) => {
  return (
    <div className="qwq">
      {datos.map((item) => (
        <div key={item.id} className="post-lista">
          {" "}
          <Link to={`/post/${item.id}`}>
            <h2>{item.titulo}</h2>
            <p>
              Autor: <strong>{item.autor}</strong>
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListaPosts;
