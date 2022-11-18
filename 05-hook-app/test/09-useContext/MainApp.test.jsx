import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainApp } from "../../src/09-useContext";

describe('Pruebas en MainApp', () => {

    test('debe de mostar el home page', () => { 

        render(

            <MemoryRouter>
                <MainApp />
            </MemoryRouter>
        );

        expect( screen.getByText('Home Page')).toBeTruthy()

    });


    test('debe de mostar el login page', () => { 

        render(

            <MemoryRouter initialEntries={['/login']}>
                <MainApp />
            </MemoryRouter>
        );

        expect( screen.getByText('Login Page')).toBeTruthy()

    });

});