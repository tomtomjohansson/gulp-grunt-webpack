import React from 'react';
import UserList from '../containers/user-list';
import ActiveUser from '../containers/active-user';

// require('../../scss/style.scss');
const App = ()=>(
   <div>
      <h2>Username List:</h2>
      <UserList/>
      <hr/>
      <h2>User Details</h2>
      <ActiveUser />
   </div>
);

export default App;
