// import React from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import Card from 'react-bootstrap/Card'
// import DateTimeDisplay from './../DateTimeDisplay/DateTimeDisplay'

// class Board extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = this.state = {
//       isLoaded: false,
//       userBoards: [],
//       token: this.props.user.token
//     } // this.state
//   } // constructor
//   componentDidMount () {
//     axios({
//       url: `${apiUrl}/userBoards/orderdByDateDesc`,
//       method: 'GET',
//       headers: {
//         Authorization: 'Bearer ' + `${this.state.token}`
//       }
//     })
//       .then(response => {
//         this.setState({
//           isLoaded: true,
//           userBoards: response.data.userBoards
//         })
//       })
//       .catch(console.error)
//   } // componentDidMount
//   render () {
//     let jsx
//     // while the books are loading
//     if (this.state.isLoaded === false) {
//       jsx = <p>Loading...</p>
//       // if no books
//     } else if (this.state.userBoards.length === 0) {
//       jsx = <p>No boards, please add one. </p>
//       // when the request is complete
//     } else {
//       jsx = (
//         <div className="boards">
//           {this.state.userBoards.map(userBoard => {
//             return <Card key={userBoard._id} style={{ width: '24rem' }} className="cards">
//               <div className="pt-2 pr-2 pl-2 pb-2 mb-0 bg-gradient-primary text-white">
//                 <Card.Header>{userBoard.boardName}</Card.Header>
//                 <div className="bg-gradient-dark">
//                   <Card.Text>Tag: &nbsp;
//                     {userBoard.owner.email}
//                   </Card.Text>
//                   <Card.Body>
//                     <Card.Text>Tag: &nbsp;
//                       {userBoard.topic}
//                     </Card.Text>
//                     <Card.Title>{userBoard.description}</Card.Title>
//                     <Card.Text>
//                     Created on: &nbsp;
//                       <DateTimeDisplay dateTimeString={userBoard.createdAt}></DateTimeDisplay>
//                     </Card.Text>
//                   </Card.Body>
//                 </div>
//               </div>
//             </Card>
//           })}
//         </div>
//       )
//     }
//     return (
//       <div className="board">
//         <h2>Discussion Board</h2>
//         {jsx}
//       </div>
//     )
//   }
// }
//
// export default Board
