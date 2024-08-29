import React from 'react'
import TaskManager from './components/TaskManager.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Header/>
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/login' element={<Signin/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route   element={<PrivateRoute/>}>
      <Route  path='/dash' element={<Dashboard/>}/>
      </Route>
    </Routes>
    
    </BrowserRouter>
    </div>
  )
}

export default App
