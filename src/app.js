'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content'
import { get } from 'axios'


class App extends Component {
  constructor() {
    super()
    this.state = {
      userInfo: null,
      repos: [],
      starred: []
    }
  }

  handleSearch(e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13

    if (keyCode === ENTER) {
      get(`https://api.github.com/users/${value}`)
        .then((response) => {
          this.setState({
            userInfo: {
              username: response.data.name,
              photo: response.data.avatar_url,
              login: response.data.login,
              repos: response.data.public_repos,
              followers: response.data.followers,
              following: response.data.following
            }
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  render() {
    return <AppContent
      userInfo={this.state.userInfo}
      repos={this.state.repos}
      starred={this.state.starred}
      handleSearch={(e) => this.handleSearch(e)}
    />
  }
}

export default App
