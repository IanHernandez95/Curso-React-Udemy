import { useEffect, useState } from "react"
import { Message } from "./Message";


export const SimpleForm = () => {

    const [formState, setFormState] = useState({
        username: 'usuario',
        email: 'usuario@gmail.com'
    });

    const {username, email} = formState;

    const onInputChange = ({target}) => {
        const {name, value} = target
        setFormState({
            ...formState, 
            [ name ]: value
        })
    }

    useEffect( () => {
        // console.log('use efec llamado')
    }, [ ]);

    useEffect( () => {
        // console.log('cambio el form')
    }, [formState ]);

    useEffect( () => {
        // console.log('email cambio')
    }, [email]);


    return (
        <>
            <h1>Formulario Simple</h1>
            <hr />

            <input 
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={username}
                onChange={ onInputChange }
            />
            <input 
                type="email"
                className="form-control mt-2"
                placeholder="Example@mail.com"
                name="email"
                value={email}
                onChange={ onInputChange }
            />

            {
                (username === 'usuario2') && <Message/>
            }

        
        </>
    )
}
