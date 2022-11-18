import { todoReducer } from "../../src/08-useReducer/todoReducer"

describe('Pruebas en todoReducer', () => {

    const initialState = [{
        id: 1,
        description: 'Demo Todo',
        done: false,
    }]


    test('debe de regresar el estado inicial', () => {

        const newState = todoReducer( initialState, {});
        expect( newState ).toBe(initialState)

    });

    test('debe de agregar un Todo', () => {

        const action = {
            type: '[TODO] Add Todo',
            payload: {
                id: 2,
                description: 'nuevo Todo 2',
                done: false,
            }
        };

        
        const newState = todoReducer( initialState, action);
        expect( newState.length ).toBe( 2 )
        expect( newState ).toContain( action.payload )

    });

    test('debe de borrar un Todo', () => {

        const action = {
            type: '[TODO] Add Todo',
            payload: {
                id: 2,
                description: 'nuevo Todo 2',
                done: false,
            }
        };

        const newState = todoReducer( initialState, action);

        const actionremover = {
            type: '[TODO] Remove Todo',
            payload: 2
        }

        const newState2 = todoReducer( newState, actionremover)

        expect( newState2.length ).toBe( 1 )     


    
    });

    test('debe de realzar el toggle', () => {

        const action = {
            type:'[TODO] Toggle Todo',
            payload: 1
        }

        const newState = todoReducer( initialState, action)
        const [{ id , description , done}] = newState
        expect( done ).toBeTruthy()

        const newState2 = todoReducer( newState, action)
        expect( newState2[0].done ).toBe( false )

    });

});