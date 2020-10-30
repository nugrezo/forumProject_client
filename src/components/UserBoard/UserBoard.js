import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from 'react-bootstrap/Card'
import DateTimeDisplay from './../DateTimeDisplay/DateTimeDisplay'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class UserBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      userBoards: [],
      token: this.props.user.token
    } // this.state
  } // constructor
  componentDidMount () {
    axios({
      url: `${apiUrl}/userBoards`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${this.state.token}`
      }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          userBoards: response.data.userBoards
        })
      })
      .catch(console.error)
  } // componentDidMount

  render () {
    let jsx
    // while the books are loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
      // if no books
    } else if (this.state.userBoards.length === 0) {
      jsx = <p>No boards, please add one. </p>
      // when the request is complete
    } else {
      jsx = (
        <div className="allBoards">
          {this.state.userBoards.map(userBoard => {
            return <Card key={userBoard._id} style={{ width: '24rem' }} className="cards">
              <div className="pt-2 pr-2 pl-2 pb-2 mb-0 bg-gradient-primary text-white">
                <Card.Header>Creater: &nbsp; {userBoard.owner.email}</Card.Header>
                <Card.Header>Board Name: &nbsp; {userBoard.boardName}</Card.Header>
                <div className="bg-gradient-dark">
                  <Card.Body>
                    <Card.Title>Topic: &nbsp;{userBoard.topic}</Card.Title>
                    <Card.Text>Description: &nbsp;{userBoard.description}</Card.Text>
                    <Card.Text>
                      <br/>
                    Created on: &nbsp;
                      <DateTimeDisplay dateTimeString={userBoard.createdAt}></DateTimeDisplay>
                    </Card.Text>
                  </Card.Body>
                </div>
              </div>
              <div>
                <ul>
                  <Link to={`/user-board/${userBoard._id}`}>
                    <Button className='button'>Board Actions</Button>
                  </Link>
                </ul>
              </div>
            </Card>
          })}

        </div>
      )
    }
    return (
      <div className="userBoard">
        <h2> My Created Boards </h2>
        {jsx}
      </div>
    )
  }
}

export default withRouter(UserBoard)
