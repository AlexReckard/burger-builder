import {takeEvery, all} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';

// listener to execute logoutSaga whenever AUTH_INIT_LOGOUT appears
// pointer to the function, no need to call the function
export function* watchAuth() {
    // can use all function to run tasks simultaneously
    yield all([
      takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga),
      takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
      takeEvery(actionTypes.AUTH_USER, authUserSaga),
      takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
    // take every action and run this saga
    // yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
};

export function* watchOrder() {
    // can also use takeLatest function
    // If a saga task was started previously (on the last action dispatched
    // before the actual action), and if this task is still running,
    // the task will be cancelled.
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
};
