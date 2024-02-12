import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
  const {isAuthenticated} = useSelector((state) => state.login);
  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;