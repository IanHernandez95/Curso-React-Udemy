import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes from "../../src/data/heroes";


describe('Pruebas en 08-imp-exp', () => { 
    
    test('getHeroeById debe retornar un heroe por ID', () => {

        const id=1;
        const hero = getHeroeById(id)

        expect(hero).toEqual({ id:1, name:'Batman', owner: 'DC' })

    });

    test('getHeroeById debe retornar undefined si no existe el ID', () => {

        const id = 100;
        const hero = getHeroeById(id)
        
        expect( hero ).toBeFalsy();

    });

    test('getHeroeByOwner debe retornar length', () => {

        const owners = 'Marvel';
        const hero = getHeroesByOwner(owners)

        expect( hero.length ).toBe( 2 )

        expect( hero).toEqual( heroes.filter(( heroe ) => heroe.owner === owners))

    });

    test('getHeroeByOwner debe retornar un heroes por Owner', () => {

        const owners = 'otro';
        const hero = getHeroesByOwner(owners)

        expect(hero).toEqual( heroes.filter(( h ) => h.owner === owners))

    });
})