import { useState } from "react"
import { UserContext } from "./UserContent"

// const user = {
//     id: '123',
//     name: 'Ian Hernandez',
//     email: 'email@email.com'
// }

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState();

    return (
        // <UserContext.Provider value={{ user }}>
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}
