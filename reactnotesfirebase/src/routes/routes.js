import {HashRouter, Route, Routes} from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { PrivateRoutes } from '.'


export const AppRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Login />}/> 
                <Route path='/home' element={<PrivateRoutes />}>
                <Route path='/home' element={<Home/>}/> 
                </Route>
            </Routes>
        </HashRouter>
    )
}
