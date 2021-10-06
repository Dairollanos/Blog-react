import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to="/" className="logo">
        {" "}
        DALLP BLOG
      </Link>
      <div className="links">
        <Link to="/">Incio</Link>
        <Link to="/crear">Crear</Link>
        <Link to="/perfil">Perfil</Link>
      </div>
    </div>
  );
};

export default Navbar;
