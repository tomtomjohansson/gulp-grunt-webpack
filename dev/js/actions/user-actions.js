export const selectUser = (user)=>{
   console.log('You clicked on: ',user.first);
   return {
      type: 'SELECT_USER',
      payload: user
   };
};
