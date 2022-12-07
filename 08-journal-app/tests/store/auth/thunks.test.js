import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/provider"
import { checkingCredentials, login, logout } from "../../../src/store/auth"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal"
import { testUser } from "../../fixtures/authFixtures"

jest.mock('../../../src/firebase/provider')

describe('Pruebas en auththunks', () => {

    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
    
    test('debe invocar el checkingAuthentication', async() => {

        await checkingAuthentication()( dispatch )
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        

    });

    test('starGooogleSingIn debe de llamar a checkingCredential y login - Exito', async() => {

        const loginData = {ok: true, ...testUser};
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('starGooogleSingIn debe de llamar a checkingCredential y logout - Error', async() => {

        const loginData = {ok: false, errorMessage: 'Un error en Google'};
        
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

        

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredential y login - Exito', async() => {

        const loginData = { ok: true, ...testUser };
        const formData = { email: testUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(login( loginData ));

    });


    test('startLogout debe de llamar logoutFirebase, clearnotes y logout', async() => {

        await startLogout()(dispatch)

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );


    })


})