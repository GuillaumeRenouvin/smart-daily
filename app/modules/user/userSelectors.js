/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectUser = (state) => state.get('user');

const makeSelectUserId = () => createSelector(
  selectUser,
  (userState) => userState.get('userId')
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

const makeSelectDoneColumnId = () => createSelector(
  selectUser,
  (userState) => userState.get('doneColumnId')
);

const makeSelectValidateColumnId = () => createSelector(
  selectUser,
  (userState) => userState.get('validateColumnId')
);

export {
  selectUser,
  makeSelectUserId,
  makeSelectBoardId,
  makeSelectBacklogColumnId,
  makeSelectDoingColumnId,
  makeSelectDoneColumnId,
  makeSelectValidateColumnId,
};
