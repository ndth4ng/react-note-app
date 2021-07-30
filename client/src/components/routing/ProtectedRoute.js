import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    <div className="spinner-container">
      <Spinner animation="border" varient="info" />
    </div>;
  }

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <>
              <Component {...rest} {...props} />
            </>
          ) : (
            <Redirect to="/login" />
          ) 
        }
      />
    </div>
  );
};

export default ProtectedRoute;
