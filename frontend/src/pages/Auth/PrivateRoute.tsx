import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/store";

const PrivateRoute = () => {
	const { userInfo } = useAppSelector((state) => state.auth);

	return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
