import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/user-actions.js';

// @connect((store) => {
//   return {
//     users: store.users
//   };
// })
//
// export default class UserList extends Component{
//    createUserList(users){
//       return users.map(x =>
//          <li onClick={this.selectUser.bind(this,x)} key={x.id}>
//             {x.first} {x.last}
//          </li>
//       );
//    }
//
//    selectUser(user){
//       this.props.dispatch(selectUser(user));
//    }
//
//    render(){
//       const {users} = this.props;
//       return(
//          <ul>
//             {this.createUserList(users)}
//          </ul>
//       );
//    }
// }

class UserList extends Component{
   createUserList(users){
      return users.map(x =>
         <li onClick={ () => this.props.selectUser(x)} key={x.id}>
            {x.first} {x.last}
         </li> );
   }
   render(){
      const {users} = this.props;
      return(
         <ul>
            {this.createUserList(users)}
         </ul>
      );
   }
}

function matchDispatchToProps(dispatch){
   return bindActionCreators({selectUser:selectUser},dispatch);
}

function mapStateToProps(state){
   return {
      users: state.users
   };
}

export default connect(mapStateToProps,matchDispatchToProps)(UserList);
