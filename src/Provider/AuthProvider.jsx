import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


import app from '../FirebaseAuthentication/firebase.config'
import { createContext, useState } from "react";


const auth = getAuth(app);
export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userInfo = {
        user,
        loading,
        signUpUser
    }

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;