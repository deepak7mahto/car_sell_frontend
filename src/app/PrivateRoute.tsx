import { Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks";

interface PropType {
  component: React.FC;
}

const PrivateRoute: React.FC<PropType> = ({ component: Component }) => {
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);
  return <>{isAuthenticated ? <Component /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
