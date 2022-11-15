import { render, screen } from "@testing-library/react";
import { GifItem } from "../../src/Components/GifItem";


describe('Pruebas en GifItem', () => { 

    const title = 'Saitama'
    const url = 'https://google.com/saitama.jpg'

    test('debe ser igual al snapshot', () => {

        const container = render( <GifItem title={ title }  url={ url } /> )
        expect( container ).toMatchSnapshot

    });

    test('Debe de mostrar la imagen con el url y el alt indicado', () => {

        render( <GifItem title={ title }  url={ url } /> )
        // expect( screen.getByRole('img'.src) ).toBe( url )
        const { src, alt } =  screen.getByRole('img');
        expect( src ).toBe( url );
        expect( alt ).toBe( title );

    });

    test('debe de mostrar el titulo en el componente', () => {

        render( <GifItem title={ title }  url={ url } /> );
        expect( screen.getByText( title ) ).toBeTruthy();

    })

});