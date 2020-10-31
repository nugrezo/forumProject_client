import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class CreateBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      boardName: '',
      topic: '',
      description: '',
      owner: '',
      createdUserBoardId: null,
      token: this.props.user.token
    } // this.state
  } // constructor

  onUserBoardChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      boardName: userInput
    })
  }

  onTopicChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      topic: userInput
    })
  }

    onDescriptionChangeHandler = (event) => {
      const userInput = event.target.value
      this.setState({
        description: userInput
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      const { msgAlert, history } = this.props
      const data = {
        'userBoard': {
          'boardName': this.state.boardName,
          'topic': this.state.topic,
          'description': this.state.description
        }
      }
      axios({
        url: `${apiUrl}/userBoards`,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + `${this.state.token}`
        },
        data: data
      })
        .then((response) => this.setState({
          createdUserBoardId: response.data.userBoard._id
        })
        )
        .then(() => msgAlert({
          heading: 'Create Board Success',
          message: messages.createBoardSuccess,
          variant: 'success'
        }))
        .then(() => history.push('/boards'))
        .catch(error => {
          this.setState({ boardName: '', topic: '', description: '' })
          msgAlert({
            heading: 'Could not create the board, failed with error: ' + error.messages,
            message: messages.createBoardFailure,
            variant: 'danger'
          })
        })
        .catch(console.error)
    }

    render () {
      return (
        <div>
          <h4>Create a Board</h4>
          <Form onSubmit={this.handleSubmit}>
            <Form.Control name="createboard" placeholder="Board Name" type="text" value={this.state.boardName} onChange={this.onUserBoardChangeHandler}/>
            <Form.Control name="topic" placeholder="Topic" type="text" value={this.state.topic} onChange={this.onTopicChangeHandler}/>
            <Form.Control name="description" placeholder="Description" type="text" value={this.state.description} onChange={this.onDescriptionChangeHandler}/>
            <Button variant='primary' type="submit">Submit</Button>
          </Form>
        </div>
      )
    }
}

export default withRouter(CreateBoard)
