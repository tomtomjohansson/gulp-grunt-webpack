export default function(state={active:undefined},action){
   // switch(action.type){
   //    case 'USER_SELECTED':
   //       return action.payload;
   // }
   if(action.type === 'SELECT_USER'){
      return {
         ...state,
         active:action.payload
      };
   }
   return state;
}
