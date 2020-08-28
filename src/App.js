import React, { useState, useEffect } from "react";
import apiRepositories from './services/api'
// import List from './Components/List'
// import Button from './Components/Button'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [repository, setRepository] = useState({})

  const getRepositories = async () => {
    try {
      const { data } = await apiRepositories.get('repositories')
      setRepositories(data)
    }
    catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getRepositories()
  }, [])

  const repositoryIsEmpty = repository => {
    return Object.keys(repository).length === 0
  }

  function handleInputChange({ target }) {
    const { value, name } = target
    const repositoryData = { ...repository }
    const isTech = (name, value) => name === 'techs' ?
      value.split(', ') :
      value
    repositoryData[name] = isTech(name, value)
    setRepository(repositoryData)
  }

  async function handleAddRepository(event) {
    event.preventDefault()
    // event.preventDefault()
    // try {
    //   if (repositoryIsEmpty(repository)) throw new Error('No repository found')
    //   const response = await apiRepositories.post('repositories', repository)
    //   const { data, status } = response
    //   if (status !== 200) throw new Error('could not add repository')
    //   setRepositories([...repositories, data])
    // } catch (error) {
    //   console.log(error.message)
    // }
    const response = await apiRepositories.post('repositories', {
      url: 'https://github.com/tuxpedro/appde',
      title: 'AppDE',
      techs: ['Javascript', 'HTML', 'CSS']
    })
    const { data } = response
    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    try {
      const { status } = await apiRepositories.delete(`repositories/${id}`)
      if (status !== 204) throw new Error('Could not remove repository')
      setRepositories(repositories.filter(({ id: repoId }) => repoId !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(({ id, title }) => (
            <li key={id}>
              {title}
              <button
                onClick={() => handleRemoveRepository(id)}>
                Remover
                </button>
            </li>
          ))
        }

        {
          // repositories.map(({ id, title }) =>
          //   <List
          //     key={id}
          //     id={id}
          //     title={title}
          //     value="Remover"
          //     /*onClick={() => handleRemoveRepository(id)}*/>
          //     <Button onClick={() => handleRemoveRepository(id)}></Button>
          //   </List>
          // )
        }
      </ul>

      <form>
        <label htmlFor="url">
          Url do projeto:
          <input
            type="text"
            name="url"
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="title">
          Titulo do projeto:
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="techs">
          Tecnologias do projeto:
          <input
            type="text"
            name="techs"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" onClick={handleAddRepository}>Adicionar</button>
      </form>
    </div>

  );
}

export default App;
