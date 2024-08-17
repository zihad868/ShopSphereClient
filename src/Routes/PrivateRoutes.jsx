import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const {user} = useContext(AuthContext);

    if(user?.email){
        return children;
    }

    return <Navigate to='/signin' />
};

export default PrivateRoutes;