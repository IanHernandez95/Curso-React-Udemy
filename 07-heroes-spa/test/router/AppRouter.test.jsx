import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { AppRouter } from "../../src/router/AppRouter"

describe('Pruebas en AppRouter', () => {

    test('debe de mostra el login si no esta Auth', () => {

        const contexValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contexValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        )
        
        expect( screen.getAllByText('Login').length).toBe(2)

    });

    test('debe mostra el componente de Marvel si esta Auth', () => {

        const contexValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Testing'
            }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contexValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        )

        expect( screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
    })

})