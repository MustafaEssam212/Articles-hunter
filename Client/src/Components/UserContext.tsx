import { useState, useEffect, createContext } from "react";


type StateType = {
    username: string,
    _id: number,
    email: string,
}

type UserContextProviderChildren = {
    children: React.ReactNode
}

type UserContextType = {
    User: StateType | null,
    setUser: React.Dispatch<React.SetStateAction< StateType | null >>
}


export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({children}: UserContextProviderChildren) => {

    const [User, setUser] = useState<StateType | null>(null)


    useEffect(()=>{
        if(User === null){
            const user = localStorage.getItem('UserInformation');
            const local:any = JSON.parse(user || '{}');
            setUser(local)
        }
    }, [])

   

    return(
        <UserContext.Provider value={{User, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

