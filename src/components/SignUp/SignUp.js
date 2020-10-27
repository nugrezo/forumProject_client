import React, { Component } from 'react'
// import withRouter so we can give the signUp component access to the route props
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }
  // add a handle change to update our state anytime an input changes.
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  // when the form is submitted, we will make a request to sign up our user
  onSignUp = event => {
    event.preventDefault()

    // desetructure props
    const { msgAlert, setUser, history } = this.props

    // call signUp, pass it our credentials from this.state
    signUp(this.state)
      // if we successfully signed up, immediately sign in with our credentials.
      .then(() => signIn(this.state))
      // if we signed in successfully, then set the user, with the 'user' data we
      // got back in our response
      .then(res => setUser(res.data.user))
      // show a message alert that we successfully signed up.
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      // if successful, send the user home page.
      .then(() => history.push('/'))
      // handle signUp failure error
      .catch(error => {
        // reset(clear) the form
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        // show signUp failure messages
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
