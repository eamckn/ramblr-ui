import { Routes, Route } from 'react-router-dom'
import Root from './components/Root'
import Home from './components/Home/Home'
import Post from './components/Post/Post'
import Form from './components/Form/Form'
import NotFound from './components/NotFound/NotFound'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Home />} />
          <Route path='posts/:postId' element={<Post />}  />
          <Route path='/login' element={<Form key='login' type='login'/>} />
          <Route path='/register' element={<Form key='register' type='register' />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
