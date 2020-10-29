import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'

class UserBoardUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      isUpdated: false,
      file: null,
      boardName: '',
      topic: '',
      description: '',
      owner: '',
      id: this.props.id,
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
          boardName: response.data.boardImages.boardName,
          topic: response.data.userBoards.topic,
          description: response.data.userBoards.description,
          owner: response.data.userBoards.owner
        })
      })
      .catch(console.error)
  }

  onBoardNameChangeHandler = (event) => {
    const userInput = event.target.value
    // const userImageCopy = Object.assign({}, this.state.userImage)
    // userImageCopy.description = userInput
    this.setState({
      // userImage: userImageCopy
      boardName: userInput
    })
  }

  onTopicChangeHandler = (event) => {
    const userInput = event.target.value
    // const userImageCopy = Object.assign({}, this.state.userImage)
    // userImageCopy.tag = userInput
    this.setState({
      // userImage: userImageCopy
      topic: userInput
    })
  }

  onDescriptionChangeHandler = (event) => {
    const userInput = event.target.value
    // const userImageCopy = Object.assign({}, this.state.userImage)
    // userImageCopy.description = userInput
    this.setState({
      // userImage: userImageCopy
      description: userInput
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    // make a POST request to API /books route with book data
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
      .then(() => history.push('/user-board-profile/' + this.state.id))
      .then(() => msgAlert({
        heading: 'Successfully Updated the board',
        message: messages.updateBoardSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ boardName: '', topic: '', description: '' })
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
      return <Redirect to ={`/user-board-profile/${this.state.id}`} />
    }
    let jsx
    // while the book is loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      // when the request is complete
    } else {
      jsx = (
        <div>
          <div className="board-profile-container">
            <div>
              <Card style={{ width: '24rem' }} >
                <div className="pt-2 pr-2 pl-2 pb-2 mb-0 bg-gradient-primary text-white">
                  <Card.Header>Creater: &nbsp;{this.state.owner.email}</Card.Header>
                  <Card.Header>Board Name: &nbsp;{this.state.bardName}</Card.Header>
                  <div className="bg-gradient-dark">
                    <Card.Body>
                      <form onSubmit={this.handleSubmit}>
                        <Card.Header>Creater: &nbsp;{this.state.owner.email}</Card.Header>
                        <Card.Header>Creater: &nbsp;<input name="boardName" type="text" value={this.state.boardName} onChange={this.onBoardNameDChangeHandler}/></Card.Header>
                        <Card.Text>
                          <input name="topic" type="text" value={this.state.topic} onChange={this.onTopicChangeHandler}/>
                          <input name="description" type="text" value={this.state.description} onChange={this.onDescriptionChangeHandler}/>
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
        <h2>User Board Update Page</h2>
        {jsx}
      </div>
    )
  }
}

export default withRouter(UserBoardUpdate)
