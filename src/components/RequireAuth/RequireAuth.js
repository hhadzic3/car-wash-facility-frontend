import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router';
import { UserRoles } from "../../common/enums/enums";
import { getDecodedToken, getToken } from "../../services/authService";

const RequireAuth = ({ element, allowedRoles }) => {
    const { isLoggedIn, userRole, setIsLoggedIn, setUserRole } = useAuth();
    const navigate = useNavigate();

    function setCastedRole(authority) {
        authority == UserRoles.User ? setUserRole(UserRoles.User) : setUserRole(UserRoles.Admin); 
    }

    useEffect(() => {
        if (!isLoggedIn)
            navigate('/login')
        if (isLoggedIn == undefined){
            if (getToken()){
                setIsLoggedIn(true)
                const role = getDecodedToken(getToken()).authorities[0].authority;    
                if (!allowedRoles?.includes(role)){
                    navigate('/unauthorized')
                }    
                setCastedRole(role)
            } else {
                setIsLoggedIn(false);
            }
        }
    }, [userRole, isLoggedIn]); 
        
    return ( 
        <>
            { element }
        </>
    );
}

export default RequireAuth;