import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { createContext } from "react";
import { auth, db } from "../Firebase/Firebase";
import { useEffect } from "react";
import { v4 as uuid } from 'uuid'
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export const dbContext = createContext();

export const useDb = () => {
    const context = useContext(dbContext);
    return context;
}

export function DbProvider({ children }) {
    const [user, setUser] = useState(null);
    const loginFuntion = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const saveAnimeFuntions = async (anime) => {
        const newDoc = {
            id: uuid(),
            name: anime.name,
            description: anime.description,
            img: anime.img
        }

        const docRef = doc(db, "Animes", newDoc.id);
        await setDoc(docRef, newDoc).then(async () => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Exito! Creado correctamente',
                showConfirmButton: false,
                timer: 1500
            }).catch((error) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error! no se creo correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        })
    }

    useEffect(() => {
        const unsubscibre = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
        return unsubscibre();
    }, [])
    return (
        <dbContext.Provider
            value={{
                loginFuntion,
                user, 
                saveAnimeFuntions   
            }}
        >
            {children}
        </dbContext.Provider>
    )
}