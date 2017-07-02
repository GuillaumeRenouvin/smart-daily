import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import {
  CHANGE_USER_ID,
  CHANGE_USER_TRELLO_TOKEN,
  CHANGE_BOARD_ID,
  CHANGE_COLUMNS_ID,
  LOGOUT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  userId: null,
  userTrelloToken: null,
  boardId: null,
  backlogColumnId: null,
  doingColumnId: null,
  validateColumnId: null,
  doneColumnId: null,
  rehydrated: false,
});

function userReducer(state = initialState, action) {
  let rehydratePayload = initialState;
  if (action.payload && action.payload.user) rehydratePayload = action.payload.user;
  switch (action.type) {
    case CHANGE_USER_ID:
      return state
        .set('userId', action.userId);
    case CHANGE_USER_TRELLO_TOKEN:
      return state
        .set('userTrelloToken', action.userTrelloToken);
    case CHANGE_BOARD_ID:
      return state
        .set('boardId', action.boardId);
    case CHANGE_COLUMNS_ID:
      return state
        .set('backlogColumnId', action.backlogColumnId)
        .set('doingColumnId', action.doingColumnId)
        .set('validateColumnId', action.validateColumnId)
        .set('doneColumnId', action.doneColumnId);
    case LOGOUT:
      return state
        .set('userId', null)
        .set('boardId', null)
        .set('backlogColumnId', null)
        .set('doingColumnId', null)
        .set('validateColumnId', null)
        .set('doneColumnId', null);
    case REHYDRATE:
      return state
        .set('rehydrated', true)
        .set('userTrelloToken', rehydratePayload.get('userTrelloToken'))
        .set('userId', rehydratePayload.get('userId'))
        .set('boardId', rehydratePayload.get('boardId'))
        .set('backlogColumnId', rehydratePayload.get('backlogColumnId'))
        .set('doingColumnId', rehydratePayload.get('doingColumnId'))
        .set('validateColumnId', rehydratePayload.get('validateColumnId'))
        .set('doneColumnId', rehydratePayload.get('doneColumnId'));
    default:
      return state;
  }
}

export default userReducer;
