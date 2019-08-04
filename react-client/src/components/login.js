import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      token: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  handleChange (e) {
    this.setState({ token: e.target.value })
  }
  handleSubmit (e) {
    e.preventDefault()
    if (this.state.loggedIn) {
      window.localStorage.removeItem('jwt')
      this.setState({ loggedIn: false, token: '' })
    } else {
      window.localStorage.setItem('jwt', this.state.token)
      this.setState({ loggedIn: true })
    }
    window.location.reload() // needed to read new val into const JWT
  }
  componentDidMount () {
    let token = window.localStorage.getItem('jwt')
    let loggedIn = true
    if (token === null) {
      token = ''
      loggedIn = false
    }
    this.setState({ loggedIn, token })
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='loginInput' >{this.state.loggedIn ? null : 'Key:'}</label>
          {this.state.loggedIn ? null : <input type='password' id='loginInput' onChange={this.handleChange} value={this.state.token} /> }
          <button type='submit'>{this.state.loggedIn ? 'Log Out' : 'Log In'}</button>
        </form>
      </div>
    )
  }
}
/*
Login.propTypes = {}
*/
export default Login
