import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/navbar";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}))


describe('Pruebas en Navbar', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'testing'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el nombre del usuario', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getByText('testing')).toBeTruthy()

    });

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const btnLogout = screen.getByRole('button')
        fireEvent.click(btnLogout)

        expect( contextValue.logout ).toHaveBeenCalled()
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true})

    });
});