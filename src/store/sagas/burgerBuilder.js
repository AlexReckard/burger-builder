import {put} from 'redux-saga/effects';
import * as actions from '../actions';

import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
  try {
      const response = yield axios.get('https://burger-builder-1215.firebaseio.com/ingredients.json')
      yield put(actions.setIngredients(response.data));
  } catch (error) {
      yield put(actions.fetchIngredientsFailed());
  };
};
