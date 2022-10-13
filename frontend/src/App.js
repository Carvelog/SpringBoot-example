import './App.css'

import { useEffect } from "react"
import { Route, Routes } from 'react-router-dom'

import { fetchItems } from './store/items';
import { authActions } from "./store/auth"
import { useDispatch, useSelector } from "react-redux"

import Header from './Components/Header/Header'
import ItemList from './pages/ItemsList/ItemsList'
import NewItem from './pages/NewItem/NewItem'

let isInitial = true

function App() {

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)


  useEffect(() => {
    dispatch(fetchItems())
}, [dispatch])

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user){
        dispatch(authActions.signin())
        } else {
        dispatch(authActions.signout())
        }

        if(isInitial) {
        isInitial = false
        return
        }

        if(isAuthenticated)
        dispatch(fetchItems())
    }, [isAuthenticated, dispatch])

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='/' />
          <Route path='/items' element={<ItemList />}/>
          <Route path='/newitem' element={<NewItem />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
