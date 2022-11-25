import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types"

describe('Pruebas en authReducer', () => {

    const user = {id: 'ABC', name: 'Testing'}

    test('debe retornar el estado por defecto', () => {

        const state = authReducer({logged: false}, {})
        expect( state ).toEqual({logged: false});
        expect( state.logged ).toBeFalsy();


    });

    test('debe de (login) llamar el login autenticar y establecer el usuario', () => {

        const action = {
            type: types.login,
            payload: user
        }

        const state = authReducer({logged: false}, action)
        expect( state.logged ).toBeTruthy();
        expect( state.user ).toBe( user )
        expect( state ).toEqual({
            logged: true,
            user: action.payload
        })

    });

    test('logout debe borrar el name del usuario y el logged a false', () => {

        const action = {
            type: types.login,
            payload: user
        }

        const action2 = {
            type: types.logout
        }

        const initialstate = authReducer({logged: false}, action)
        const newState = authReducer( initialstate, action2)
        expect( newState.logged ).toBeFalsy()
        expect( newState ).toEqual({logged: false})

    })

})