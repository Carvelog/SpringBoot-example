import './App.css';

import Header from './Components/Header/Header'
import ItemList from './pages/ItemsList/ItemsList';

import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='/' />
          <Route path='/items' element={<ItemList />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
