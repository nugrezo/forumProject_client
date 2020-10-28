import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreateBoard from '../CreateBoard/createBoard'
import Board from '../Boards/board'

class App extends Component {
  constructor () {
    super()

    this.state = {
      // state to keep of the currently signed in user
      // we do this so we can keep track of the users token to make
      // authenticated request to our API
      user: null,
      // this is an array of messages for our user. We can use it to notify our
      // user when an action succeeds or fails
      msgAlerts: []
    }
  }
  // create a helper function that will take a user as a parameter and update the
  // user state
  // we will use this function anytime we use the application(to keep track of token)
  setUser = user => this.setState({ user })
  // create a helper function that will reset the user back to null
  // we will use this when we sign out to clear user.
  clearUser = () => this.setState({ user: null })

  // create a function that will show a message alert to the user. The message will
  // disappear after 5 seconds. This message alert accepts 3 properties.
  // 1. heading - the title 2. the body(main text) 3. variant(the color or style
  // by react boostrap)
  msgAlert = ({ heading, message, variant }) => {
    this.setState({
      // set our msgAlert state array to new array
      // that has all of the messages from our existing msgAlert
      // with our new message alert added at the end
      msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  componentDidMount () {
    this.msgAlert({
      heading: 'Welcome!',
      message: 'Welcome to the home page!',
      variant: 'info'
    })
  }

  render () {
    // destructure our msgAmert and user state
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/boards' render={() => (
            <Board user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-board' render={() => (
            <CreateBoard msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
