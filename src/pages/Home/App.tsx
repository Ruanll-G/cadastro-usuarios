import './App.css'
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

interface User {
  id: string;
  name: string;
  age: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([])

  const inputName = useRef<HTMLInputElement>(null)
  const inputAge = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)

  async function getUsers() {
    const getUsersApi = await api.get('/user')
    setUsers(getUsersApi.data)
  }

  async function createUsers() {
    if (!inputName.current || !inputAge.current || !inputEmail.current) return;
    await api.post('/user', {
    name: inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id: string) {
    await api.delete(`/user/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usúario</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName} />
        <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
        <input placeholder='Email' name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>Email: <span>{user.email}</span></p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>
          <img src="../src/assets/trash.png" alt="Deletar" />
        </button>
      </div>
    
      ))}
    </div>
  )
}

export default App
