import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

@connect((store) => {
  return {
    active: store.active.active,
    users: store.users
  };
})

export default class ActiveUser extends Component{
   render(){
      const {active} = this.props;
      if(active !== undefined){
         return(
            <div>
               <h3>{active.first} {active.last}</h3>
               <img src={active.thumbnail}/>
            </div>
         );
      }
      else{
         return <div></div>;
      }
   }
}
