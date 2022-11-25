import { types } from "../../../src/auth"


describe('Pruebas en Types ', () => {
    
    test('debe de retornar estos types', () => {

        expect(types).toEqual({
            login: '[Auth] login',
            logout: '[Auth] logout',
        })
    })
})