import { useState, createContext, useEffect } from 'react'
import jwt_decode from "jwt-decode";

interface IProps {
    children: React.ReactNode
}

interface IAuth {
    isAuthenticated: boolean;
    user: string;
}

interface IContext {
    auth: IAuth
    setAuth: React.Dispatch<React.SetStateAction<IAuth>>
}

export const AuthContext = createContext<Partial<IContext>>({})

const AuthProvider: React.FC<IProps> = ({ children }) => {

    const [auth, setAuth] = useState<IAuth>({
        isAuthenticated: false,
        user: 'Anonymous'
    })

    const checkActiveToken = () => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (token) {
                console.log(`For debugging purposes, current token is:${token}`);
                const decodedToken = jwt_decode<any>(token);
                console.log(decodedToken);

                const dateNow = new Date();
                if (decodedToken.exp * 1000 < dateNow.getTime()) {
                    setAuth(prev => ({
                        ...prev,
                        isAuthenticated: false
                    }))
                    return
                }
                setAuth(prev => ({
                    ...prev,
                    isAuthenticated: true
                }))
            }
        }
    }

    useEffect(() => {
        checkActiveToken()
    }, [])


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
