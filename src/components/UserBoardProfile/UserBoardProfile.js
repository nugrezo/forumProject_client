import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import DateTimeDisplay from './../DateTimeDisplay/DateTimeDisplay'

class UserBoardProfile extends Component {
  constructor (props) {
    super(props)
    this.tempDescription = ''
    this.tempTag = ''
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
      token: this.props.user.token,
      createdAt: null
    } // this.state
  } // constructor
  componentDidMount () {
    axios({
      url: `${apiUrl}/BoardImages/` + this.props.id,
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
          description: response.data.userImages.description,
          owner: response.data.userBoards.owner,
          formShown: false,
          tempDescription: null,
          createdAt: response.data.userBoards.createdAt,
          updatedAt: response.data.userBoards.updatedAt
        })
      })
      .catch(console.error)
  }

  onEditButtonClick = () => {
    this.setState({ formShown: true })
    this.tempBoardName = this.state.boardName
    this.tempTopic = this.state.topic
    this.tempDescription = this.state.description
  }
  onCancelButtonClick = () => {
    this.setState({ formShown: false,
      boardName: this.state.boardName,
      topic: this.state.topic,
      description: this.tempDescription })
  }

  handleDelete = () => {
    const { msgAlert, history } = this.props
    const userId = this.state.id
    axios({
      url: `${apiUrl}/userBoards/${userId}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + `${this.state.token}`
      }
    })
      .then(response => this.setState({ userBoardId: this.state.createdUserboardId }))
      .then(() => msgAlert({
        heading: 'Successfully Deleted the Board',
        message: messages.deleteBoardSuccess,
        variant: 'success'
      }))
      .then(history.push('/user-board'))
      .catch(error => {
        this.setState({ boardName: '', topic: '', description: '' })
        msgAlert({
          heading: 'Could not delete the board, failed with error: ' + error.messages,
          message: messages.deleteBoardFailure,
          variant: 'danger'
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
    const { msgAlert } = this.props
    // make a POST request to API /
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
      .then(response => {
        this.setState({
          isUpdated: true,
          formShown: false,
          updatedAt: response.data.userBoards.updatedAt
        })
      })
      .then(() => msgAlert({
        heading: 'Successfully Updated an Image',
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
    let jsx
    // while the book is loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      // when the request is complete
    } else {
      jsx = (
        <div className="board-profile-container">
          <div>
            <Card style={{ width: '24rem' }} >
              <div className="pt-2 pr-2 pl-2 pb-2 mb-0 bg-gradient-primary text-white">
                <Card.Header>Creater: &nbsp;{this.state.owner.email}</Card.Header>
                <Card.Header>Board Name: &nbsp;{this.state.bardName}</Card.Header>
                <div className="bg-gradient-dark">
                  <Card.Body>
                    {!this.state.formShown &&
                    <div>
                      <Card.Title>Topic: &nbsp;{this.state.topic}</Card.Title>
                      <Card.Text>Description: &nbsp;{this.state.description}</Card.Text>
                    </div>
                    }
                    {this.state.formShown &&
                      <form onSubmit={this.handleSubmit}>
                        <Card.Text>
                          <textarea rows="4" cols="37" name="boardName" type="text" value={this.state.boardName} onChange={this.onBoardNameChangeHandler}/>
                          <textarea rows="4" cols="37" name="topic" type="text" value={this.state.topic} onChange={this.onTopicChangeHandler}/>
                        </Card.Text>
                        <Card.Text>
                          <input name="description" type="text" value={this.state.description} onChange={this.onDescriptionChangeHandler}/>
                          <input type="submit" value="Submit" />
                          <input type="button" value="Cancel" onClick={this.onCancelButtonClick}/>
                        </Card.Text>
                      </form>
                    }
                    <Card.Text>
                      <br/>
                    Created on: &nbsp;
                      <DateTimeDisplay dateTimeString={this.state.createdAt}></DateTimeDisplay>
                    </Card.Text>
                    <Card.Text>
                    Updated on: &nbsp;
                      <DateTimeDisplay dateTimeString={this.state.updatedAt}></DateTimeDisplay>
                    </Card.Text>
                  </Card.Body>
                </div>
              </div>
            </Card>
          </div>
          <ul>
            <Button variant="primary" type="button" onClick={this.handleDelete}>Delete</Button>
            {/* <Link to={`/image-update/${this.state.id}`}> */}
            <Button variant="primary" type="button" onClick={this.onEditButtonClick}>Edit</Button>
          </ul>
        </div>
      )
    }
    return (
      <div>
        <h2>Board Page</h2>
        {jsx}
      </div>
    )
  }
}

export default UserBoardProfile
