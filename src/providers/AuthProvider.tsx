import { FC, ReactNode, useState } from 'react';
import { createContext } from 'react';
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface authInterface {
    children: ReactNode
}

export const AuthContext = createContext<any>(null);


const AuthProvider: FC<authInterface> = ({ children }) => {
    const [user, setUser] = useState<any>(auth?.currentUser);
    const [loading, setLoading] = useState<boolean>(true);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            setUser(user);
        } else {
            setUser(null);
        }
        loading && setLoading(false);
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {loading ? "Loading!!!" : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;