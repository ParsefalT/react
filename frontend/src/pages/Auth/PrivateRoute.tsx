import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/store";

const PrivateRoute = () => {
	const { userInfo } = useAppSelector((state) => state.auth);
	console.log(userInfo)
	return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
