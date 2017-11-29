  // const initialState = [
  //   {id: 32233222322, name: 'Smells like spirit' },
  //   {id:323546576, name: 'Enter Sandman' }
  // ]

  const initialState = [];
  
  export default function tracks(state = initialState, action) {
    if (action.type === 'ADD_TRACK') {
      return [
        ...state,
        action.payload
      ];
    } else if (action.type === 'DELETE_TRACK') {
      return state;
    }
    return state;
  }