import { 
  LOAD_POST_COMMENTS 
} from '../actions/comments'

const comments = (state = [], action) => {
  switch (action.type) {
    case LOAD_POST_COMMENTS:
      return action.comments
    default:
      return state
  }
}

export default comments