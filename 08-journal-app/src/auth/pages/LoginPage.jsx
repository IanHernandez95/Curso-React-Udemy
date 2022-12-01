import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { AuthLayout } from '../layout/AuthLayout'

import { useForm } from '../../hooks'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

const formData = {
    email: '',
    password: ''
}


export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth )

    const dispatch = useDispatch()

    const { email, password, onInputChange, formState } = useForm(formData)

    const isAuthenticated = useMemo( () => status === 'cheking', [status] )

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch( startLoginWithEmailPassword(formState) );
    }

    const onGoogleSignIn = () => {;
        dispatch( startGoogleSignIn() )
    }

    return (
        <AuthLayout title='Login'>
            
            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt: 2}}>
                            <TextField 
                                label='Correo' 
                                type='email' 
                                placeholder='Correo@example.com'
                                fullWidth
                                name='email' 
                                value={ email }
                                onChange={ onInputChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sx={{ mt: 2}}>
                            <TextField 
                                label='Contraseña' 
                                type='password' 
                                placeholder='Contraseña'
                                fullWidth 
                                name='password' 
                                value={ password }
                                onChange={ onInputChange } 
                                autoComplete='off'
                            />
                        </Grid>
                    </Grid>
                    <Grid container display={ !!errorMessage ? '' : 'none' } sx={{ mt: 1}}>
                        <Grid item xs={ 12 } >
                            <Alert severity='error'>
                                { errorMessage }
                            </Alert>
                        </Grid>
                    </Grid>
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 } >
                            <Button
                                disabled={ isAuthenticated }
                                type='submit'  
                                variant="contained" 
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 } >
                            <Button 
                                disabled={ isAuthenticated }
                                variant="contained" 
                                fullWidth
                                onClick={ onGoogleSignIn }
                            >
                                <Google/>
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography>¿No tienes cuenta? </Typography>
                        <Link component={ RouterLink } color='inherit' to='/auth/register' sx={{ ml: 1}}>
                            Crear una Cuenta
                        </Link>

                    </Grid>

                </form>

        </AuthLayout>
        
    )
}
