import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'

class EditMyBoard extends Component {
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
  componentDidMount () {
    axios({
      url: `${apiUrl}/userBoards/` + this.state.id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${this.state.token}`
      }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          file: null,
          boardName: response.data.userBoards.boardName,
          topic: response.data.userBoards.topic,
          description: response.data.userBoards.description,
          owner: response.data.userBoards.owner
        })
      })
      .catch(console.error)
  }
  onDescriptionChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      description: userInput
    })
  }
  onTopicChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      tag: userInput
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props

    axios({
      url: `${apiUrl}/userBoards/${this.state.id}`,
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${this.state.token}` },
      data: {
        userBoard: {
          boardName: this.state.boardName,
          topic: this.state.topic,
          description: this.state.description
        }
      }
    })
      .then(response => this.setState({ isUpdated: true }))
      .then(() => history.push('/boards/' + this.state.id))
      .then(() => msgAlert({
        heading: 'Successfully Updated',
        message: messages.updateBoardSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ boardName: '', tag: '', description: '' })
        msgAlert({
          heading: 'Could not update the board, failed with error: ' + error.messages,
          message: messages.updateBoardFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.isUpdated) {
      return <Redirect to ={`/board/${this.state.id}`} />
    }
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      // when the request is complete
    } else {
      jsx = (
        <div>
          <div className="board-container">
            <div>
              <Card style={{ width: '24rem' }} >
                <div className="pt-2 pr-2 pl-2 pb-2 mb-0 bg-gradient-primary text-white">
                  <Card.Header>{this.state.owner.email}</Card.Header>
                  <div className="bg-gradient-dark">
                    <Card.Img variant="top" src={this.state.boardName} />
                    <Card.Body>
                      <form onSubmit={this.handleSubmit}>
                        <Card.Text><input name="description" type="text" value={this.state.description} onChange={this.onDescriptionChangeHandler}/></Card.Text>
                        <Card.Text>
                          <input name="topic" type="text" value={this.state.topic} onChange={this.onTopicChangeHandler}/>
                          <input type="submit" value="Submit" />
                        </Card.Text>
                      </form>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <h2>Edit Board Page</h2>
        {jsx}
      </div>
    )
  }
}

export default withRouter(EditMyBoard)
