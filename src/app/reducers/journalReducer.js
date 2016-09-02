export default function(state = [], action) {
  switch(action.type) {
    case 'CREATE_ENTRY':
      return [
        ...state,
        Object.assign({}, action.entry)
      ];
    default:
      return state;
  }
}
