import {
  CHANGE_USER_ID,
  CHANGE_USER_TRELLO_TOKEN,
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

export function changeUserTrelloToken(userTrelloToken) {
  return {
    type: CHANGE_USER_TRELLO_TOKEN,
    userTrelloToken,
  };
}

export function changeBoardId(boardId) {
  return {
    type: CHANGE_BOARD_ID,
    boardId,
  };
}

export function changeColumnsId(backlogColumnId, doingColumnId, validateColumnId, doneColumnId) {
  return {
    type: CHANGE_COLUMNS_ID,
    backlogColumnId,
    doingColumnId,
    validateColumnId,
    doneColumnId,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
