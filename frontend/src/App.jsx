import './App.css'

import TermekLista from './components/TermekLista'
import RendelLista from './components/rendelLista'
import UserForm from './components/UserForm'


function App() {
  return (
    <>
      <UserForm />
      <TermekLista />
      <RendelLista />
    </>
  )
}

export default App
