import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { createContext } from "react";
import { auth } from "../Firebase/Firebase";
import { useEffect } from "react";

export const dbContext = createContext();

export const useDb = () => {
    const context = useContext(dbContext);
    return context;
}

export function DbProvider ({children}){
    const [user, setUser] = useState(null);
    const loginFuntion = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() =>{
        const unsubscibre = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
        return unsubscibre();
    }, [])
    return(
        <dbContext.Provider
            value={{
                loginFuntion, 
                user
            }}
        >
            {children}
        </dbContext.Provider>
    )
}