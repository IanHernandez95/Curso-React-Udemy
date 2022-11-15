import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/Components/GifGrid";
import { useFetchGifs } from "../../src/Hooks/useFetchGifs";

jest.mock("../../src/Hooks/useFetchGifs")

describe('Pruebas en GifGrid', () => {

    const category = 'One Punch';

    test('debe de mostrar el loading inicialmente', () => {

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        });

        render( <GifGrid  category={category} /> );
        expect( screen.getByText('Cargando...') );
        expect( screen.getByText( category ) );
    });

    test('debe de mostrar items cuando se carnan las imagenes de useFetchGifs ', () => {

        const gifs = [
            {
                id: 'asd',
                title: 'Saitama',
                url: 'https://localhost/saitama.jpg'
            },
            {
                id: 'a123',
                title: 'Goku',
                url: 'https://localhost/goku.jpg'
            }
        ]
        
        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: true
        });
        
        render( <GifGrid  category={category} /> );
        expect( screen.getAllByRole('img').length).toBe(2)


    });

});