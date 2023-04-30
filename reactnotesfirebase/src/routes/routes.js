import {HashRouter, Route, Routes} from 'react-router-dom'
import Login from '../pages/Login/Login'
import Home from '../pages/Home'
import PrivateRoutes from './'
import Register from '../pages/Login/Registro'


export const AppRoutes = () => {
    return (
        <HashRouter>
            <Routes basename={process.env.REACT_APP_URI}>
                <Route path='/' element={<Login />}/> 
                <Route path='/register' element={<Register/>}/>
                <Route path='/login#/home' element={<Home/>}/> 
                <Route path='/login#/login' element={<Login/>}/> 
                <Route path='/home' element={<Home />}>
                
                
                </Route>
            </Routes>
        </HashRouter>   
    )
}
