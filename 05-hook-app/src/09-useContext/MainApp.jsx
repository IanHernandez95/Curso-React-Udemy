import { Route, Routes, Navigate} from 'react-router-dom'
import { HomePage, LoginPage, AboutPage, NavBar } from './'
import { UserProvider } from './Context/UserProvider'

export const MainApp = () => {
    return (
        <UserProvider>
            <NavBar/>
            <hr />

            <Routes>
                <Route path='/' element={ <HomePage/> } />
                <Route path='login' element={ <LoginPage/> } />
                <Route path='about' element={ <AboutPage/> } />

                {/* <Route path="/*" element={ <LoginPage/> } /> */}
                <Route path='/*' element={ <Navigate to='/about' /> } />

            </Routes>
        </UserProvider>
    )
}
