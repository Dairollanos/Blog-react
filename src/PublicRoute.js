import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { CurrentUser } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        return CurrentUser ? (
          <Redirect to="/"></Redirect>
        ) : (
          <Component {...props} />
        );
      }}
    ></Route>
  );
};

export default PublicRoute;
