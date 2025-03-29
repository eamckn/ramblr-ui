import { Routes, Route } from 'react-router-dom'
import Root from './components/Root'
import Home from './components/Home'
import Post from './components/Post'
import Auth from './components/Auth'
import LogIn from './components/LogIn'
import Register from './components/Register'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Home />} />
          <Route path='posts/:postId' element={<Post />}  />
          <Route element={<Auth />}>
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
