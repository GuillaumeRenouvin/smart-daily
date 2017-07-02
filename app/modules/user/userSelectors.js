/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectUser = (state) => state.get('user');

const makeSelectUserRehydrated = () => createSelector(
  selectUser,
  (userState) => userState.get('rehydrated')
);

const makeSelectUserId = () => createSelector(
  selectUser,
  (userState) => userState.get('userId')
);

const makeSelectUserTrelloToken = () => createSelector(
  selectUser,
  (userState) => userState.get('userTrelloToken')
);

const makeSelectBoardId = () => createSelector(
  selectUser,
  (userState) => userState.get('boardId')
);

const makeSelectBacklogColumnId = () => createSelector(
  selectUser,
  (userState) => userState.get('backlogColumnId')
);

const makeSelectDoingColumnId = () => createSelector(
  selectUser,
  (userState) => userState.get('doingColumnId')
);

const makeSelectValidateColumnId = () => createSelector(
  selectUser,
  (userState) => userState.get('validateColumnId')
);

const makeSelectDoneColumnId = () => createSelector(
  selectUser,
  (userState) => userState.get('doneColumnId')
);

export {
  selectUser,
  makeSelectUserRehydrated,
  makeSelectUserId,
  makeSelectUserTrelloToken,
  makeSelectBoardId,
  makeSelectBacklogColumnId,
  makeSelectDoingColumnId,
  makeSelectDoneColumnId,
  makeSelectValidateColumnId,
};
