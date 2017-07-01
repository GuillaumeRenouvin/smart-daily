import {
  CHANGE_USER_ID,
  CHANGE_BOARD_ID,
  CHANGE_COLUMNS_ID,
  LOGOUT,
} from './constants';

export function changeUserId(userId) {
  return {
    type: CHANGE_USER_ID,
    userId,
  };
}

export function changeBoardId(boardId) {
  return {
    type: CHANGE_BOARD_ID,
    boardId,
  };
}

export function changeColumnsId(backlogColumnId, doingColumnId, doneColumnId, validateColumnId) {
  return {
    type: CHANGE_COLUMNS_ID,
    backlogColumnId,
    doingColumnId,
    doneColumnId,
    validateColumnId,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
