import { Navigate } from "react-router-dom";
import useAuthStore from "../store/Auth";


export default function ProtectedRoutes({children}) {
    const token = useAuthStore(state => state.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
