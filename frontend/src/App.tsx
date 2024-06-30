import { Routes } from 'react-router-dom'
import { BrowserRouter,Route } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/blog/bulk' element={<Blogs/>}/>
   
      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
