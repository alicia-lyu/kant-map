import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRoutes = (Component) => {
  function ComponentWithRoutes(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} routes={{ location, navigate, params }} />;
  }
  return ComponentWithRoutes;
};

export default withRoutes