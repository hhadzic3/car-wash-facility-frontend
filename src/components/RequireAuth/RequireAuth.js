import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router';

const RequireAuth = ({ element, allowedRoles }) => {
    const { isLoggedIn, userRole } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate('/login')
        
        if (!allowedRoles?.includes(userRole)){
            navigate('/unauthorized')
        }
    }, [isLoggedIn, userRole]); 
        
    return ( 
        <>
            { element }
        </>
    );
}

export default RequireAuth;