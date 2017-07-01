import { fromJS } from 'immutable';

import {
  CHANGE_USER_ID,
  CHANGE_BOARD_ID,
  CHANGE_COLUMNS_ID,
  LOGOUT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  userId: null,
  boardId: '57d6ace7a50c5b079e16da8c',
  backlogColumnId: '59477fb2f6900d74ecb46d73',
  doingColumnId: '57d6b0bcbaf3dbcc1ef07c99',
  doneColumnId: '59511b799da0471c871a5480',
  validateColumnId: '5948d041a03a89329a59de8f',
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_ID:
      return state
        .set('userId', action.userId);
    case CHANGE_BOARD_ID:
      return state
        .set('boardId', action.boardId);
    case CHANGE_COLUMNS_ID:
      return state
        .set('backlogColumnId', action.backlogColumnId)
        .set('doingColumnId', action.doingColumnId)
        .set('doneColumnId', action.doneColumnId)
        .set('validateColumnId', action.validateColumnId);
    case LOGOUT:
      return state
        .set('userId', null)
        .set('backlogColumnId', null)
        .set('doingColumnId', null)
        .set('doneColumnId', null)
        .set('validateColumnId', null);
    default:
      return state;
  }
}

export default userReducer;
