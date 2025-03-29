import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Post from './components/Post'
import Auth from './components/Auth'
import LogIn from './components/LogIn'
import Register from './components/Register'
import './App.css'

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const result = await (await fetch('http://localhost:8080/posts')).json()
      //console.log(result)
      setData(result)
    }
    getData()
  }, [])

  if (!data) return <div id="loading">Loading...</div>

  return (
    <>
      <Routes>
        <Route index element={<Home data={data} />} />
        <Route path='posts/:postId' element={<Post data={data} />}  />
        <Route element={<Auth />}>
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
