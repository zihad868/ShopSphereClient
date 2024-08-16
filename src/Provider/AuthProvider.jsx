import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";


import app from '../FirebaseAuthentication/firebase.config'
import { createContext, useEffect, useState } from "react";


const auth = getAuth(app);
export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = (auth) => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUser = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            return unSubscribe
        }
    }, [])

    const userInfo = {
        user,
        loading,
        signUpUser,
        signOutUser,
        updateUser
    }

    console.log(user)

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;