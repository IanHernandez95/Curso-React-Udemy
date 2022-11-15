import { getUser, getUsuarioActivo } from "../../src/base-pruebas/05-funciones";

describe('Pruebas en 05-funciones', () => { 
    
    test('getUser debe retornar un objeto', () => {

        const testUSer= {
            id: 'ABC123',
            username: 'El_Papi1502'
        };

        const user = getUser();

        expect( testUSer ).toEqual( user )

    });

    test('getUsuarioActivo debe retornar un objeto', () =>{

        const nombre = 'Ian'

        const usuario = getUsuarioActivo(nombre);

        expect( usuario ).toEqual( {
            uid: 'ABC567',
            username: nombre
        });

    });

})

