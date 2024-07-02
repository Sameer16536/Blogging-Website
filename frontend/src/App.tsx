import { Routes } from 'react-router-dom'
import { BrowserRouter,Route } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blog from './pages/Blog'

import AllBlogs from './pages/AllBlogs'
import LandingPage from './pages/LandingPage'
import PublishBlog from './PublishBlog'


const router = [
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/blog/:id",
    element: <Blog />
  },
  {
    path: "/blogs",
    element: <AllBlogs />
  },
  {
    path: "/publish",
    element: <PublishBlog />
  }
]

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {router.map((route, idx) => (
            <Route path={route.path} key={idx} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
