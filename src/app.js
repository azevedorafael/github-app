'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content';

class App extends Component {
  constructor() {
    super()
    this.state = {
      userInfo: {
        username: 'Rafael de Azevedo',
        photo: 'https://avatars2.githubusercontent.com/u/15950775?v=4',
        login:'azevedorafael',
        repos: 12,
        followers: 100,
        following: 200
      },
      repos: [{
        name: 'Repo',
        link: '#'
      }],
      starred: [{
        name: 'RepoStarred',
        link: '#'
      }]
    }
  }

  render() {
    return <AppContent
      userInfo={this.state.userInfo}
      repos={this.state.repos}
      starred={this.state.starred}
    />
  }
}

export default App
