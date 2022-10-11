import './App.css';

import Header from './Components/Header/Header'
import ItemList from './Components/ItemsList/ItemsList';

import { useSelector, useDispatch } from 'react-redux';

import {fetchItems} from './store/items'
import { useEffect } from "react"
import { authActions } from './store/auth';

let isInitial = true

function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if(isAuthenticated)
  //     dispatch(fetchItems())
  // }, [dispatch])

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

      <ItemList />
    </div>
  );
}

export default App;
