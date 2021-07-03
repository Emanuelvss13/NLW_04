import { createContext, useEffect, useState, ReactNode } from "react"
import { auth, firebase } from "../services/firebase"

type User = {
    id: string,
    name: string,
    avatar: string
}
  
type AuthContextType = {
    user: User | undefined;
    singInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}
  
export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = (props: AuthContextProviderProps ) => {
    const [user, setUser] = useState<User>()

    useEffect(() =>{
        const unsubcribe = auth.onAuthStateChanged(user => {
            if(user){
                const { displayName, photoURL, uid} = user

                if(!displayName || !photoURL){
                throw new Error('Missing information from Google Account')
                }

                setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
                })
            }

        })
        
        return () => {
            unsubcribe()
        }
    }, [user])

  async function singInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider() 

    const result = await auth.signInWithPopup(provider)

      if(result.user){
        const { displayName, photoURL, uid} = result.user

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }

  }

    return(
        <AuthContext.Provider value={{ user, singInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}