import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const apikey = localStorage.getItem('apikey');
    if (!apikey) return <Navigate to='/' />
    return children
}

export default ProtectedRoute;
