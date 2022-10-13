import './App.css'

import { useEffect } from "react"
import { Route, Routes } from 'react-router-dom'

import { authActions } from "./store/auth"
import { useDispatch } from "react-redux"

import Header from './Components/Header/Header'
import ItemList from './pages/ItemsList/ItemsList'
import NewItem from './pages/NewItem/NewItem'

let isInitial = true

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
      // if(isInitial) {
      //   isInitial = false
      //   return
      // }

      const user = localStorage.getItem('user')
      if(user){
        dispatch(authActions.signin())
      } else {
        dispatch(authActions.signout())
      }
  }, [dispatch])

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<div>HOLA</div>} />
          <Route path='/items' element={<ItemList />}/>
          <Route path='/newitem' element={<NewItem />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
