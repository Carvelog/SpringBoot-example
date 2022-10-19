import './App.css'

import { useEffect } from "react"
import { Route, Routes } from 'react-router-dom'

import { authActions } from "./store/auth"
import { useDispatch } from "react-redux"

import Header from './Components/Header/Header'
import ItemList from './pages/ItemsList/ItemsList'
import NewItem from './pages/NewItem/NewItem'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

const LandingPage = () => {
  return(
    <div className='landing-page-content'>
      <h2>Login to see the content</h2>
    </div>
  )
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
      const user = localStorage.getItem('user')
      if(user){
        dispatch(authActions.signin(JSON.parse(user).roles))
      } else {
        dispatch(authActions.signout())
      }
  }, [dispatch])

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/items' element={<ItemList />}/>
          <Route path='/newitem' element={<NewItem />}/>
          <Route path='/admin-dashboard' element={<AdminDashboard />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
