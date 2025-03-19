import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Post from './components/Post'
import Comments from './components/Comments'
import Auth from './components/Auth'
import LogIn from './components/LogIn'
import Register from './components/Register'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='posts/:postId'  >
          <Route index element={<Post />} />
          <Route path='comments' element={<Comments />} />
        </Route>
        <Route element={<Auth />}>
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
