import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { CurrentUser } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        return CurrentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login"></Redirect>
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
