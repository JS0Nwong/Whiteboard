import { Navigate } from "react-router-dom"
import useStore from '../store'

export default function PublicRoute({ Component }) {
    const { isLoggedIn } = useStore();
    return isLoggedIn ? <Navigate to="/boards" replace /> : <Component />;
}