import React from 'react'
import Menu from './menu'
import Login from './login'

const Home = () => {
  return (
    <div>
      <Menu page='home' />
      <Login />
      <div className='iframe-container'>
        <iframe
          src='https://mcflip.github.io/oils/'
          name='gh-pages'
        />
      </div>
    </div>
  )
}

export default Home
