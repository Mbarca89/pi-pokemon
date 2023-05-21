import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Team from './components/Team/Team'
import Detail from './components/Detail/Detail'
import Nav from './components/Nav/Nav'
import Landing from './components/Landing/Landing'
import Card from './components/Card/Card'
import Filters from './components/Filters/Filters';
import Create from './components/Create/Create'
import Update from './components/Update/Update'
import NotFound from './components/NotFound/NotFound'
const style = require('./App.module.css')

function App() {

   return (
      <div className={style.App}>
         <Filters></Filters>
         <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route element={(
               <>
                  <Nav />
                  <Outlet />
               </>
            )}>
               <Route path='/home' element={<Home />} />
               <Route path='/team' element={<Team />} />
               <Route path='/create' element={<Create />} />
               <Route path='/update/:id' element={<Update/>} />
            </Route>
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Landing />} />
            <Route path='/card' element={<Card />} />
         </Routes>
      </div>
   )
}

export default App;
