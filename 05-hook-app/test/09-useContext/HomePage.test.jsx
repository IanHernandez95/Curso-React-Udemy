import { render , screen } from "@testing-library/react"
import { UserContext } from "../../src/09-useContext/Context/UserContent"
import { HomePage } from "../../src/09-useContext/HomePage"


describe('Pruebas en HomePage', () => {

    const user = {
        id: 1,
        name: 'Ian'
    }    

    test('debe de mostrar el component sin el usuario', () => {

        render( 
            <UserContext.Provider value={{ user: null }}>
                <HomePage/>
            </UserContext.Provider>
        )
        
        const preTag = screen.getByLabelText('pre')
        expect( preTag.innerHTML ).toBe( 'null')

    });

    test('debe de mostrar el component con el usuario', () => {

        render( 
            <UserContext.Provider value={{ user }}>
                <HomePage/>
            </UserContext.Provider>
        )
        
        const preTag = screen.getByLabelText('pre')
        expect( preTag.innerHTML ).toContain( user.name )
        expect( preTag.innerHTML ).toContain( user.id.toString() )
    });

})