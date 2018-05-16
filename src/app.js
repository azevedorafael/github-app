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

  getGitHubApiUrl(username, type) {
    const internalUser = username ? `/${username}` : ''
    const internalType = type ? `/${type}` : ''
    return `https://api.github.com/users${internalUser}${internalType}`
  }

  handleSearch(e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13
    const target = e.target

    if (keyCode === ENTER) {
      target.disabled = true
      get(this.getGitHubApiUrl(value))
        .then((response) => {
          this.setState({
            userInfo: {
              username: response.data.name,
              photo: response.data.avatar_url,
              login: response.data.login,
              repos: response.data.public_repos,
              followers: response.data.followers,
              following: response.data.following
            },
            repos: [],
            starred: []
          })
          target.disabled = false
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  getRepos(type) {
    return (e) => {
      const username = this.state.userInfo.login
      get(this.getGitHubApiUrl(username, type))
        .then((response) => {
          this.setState({
            [type]: response.data.map((repo) => ({
              name: repo.name,
              link: repo.html_url
            }))
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
      getRepos={this.getRepos('repos')}
      getStarred={this.getRepos('starred')}
    />
  }
}

export default App
