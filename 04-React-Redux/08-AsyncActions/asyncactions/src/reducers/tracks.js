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
    } else if (action.type === 'FETCH_TRACKS_SUCCESS') {
      return action.payload;
    }
    return state;
  }