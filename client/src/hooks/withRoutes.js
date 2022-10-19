import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRoutes = (Component) => {
  function ComponentWithRoutesProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} routes={{ location, navigate, params }} />;
  }
  return ComponentWithRoutesProp;
};