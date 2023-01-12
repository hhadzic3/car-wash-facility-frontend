import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ element, allowedRoles }) => {
    const { isLoggedIn, userRole } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(allowedRoles?.includes(userRole));
    
    const location = useLocation();

    useEffect(() => {
        if (allowedRoles?.includes(userRole))
            setIsAuthorized(true) 
        else setIsAuthorized(false)
    }, [isAuthorized, isLoggedIn, userRole]); 
        
    return ( 
        <>
        {!isLoggedIn
            ?   <Navigate to="/login" state={{ from: location }} replace />
            :   isAuthorized
                ? element
                : <Navigate to="/unauthorized" state={{ from: location }} replace /> 
        }
        </>
    );
}

export default RequireAuth;