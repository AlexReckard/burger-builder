import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1
};

// using utility now
const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updatedObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updatedObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ...state,
        ingredients: {
            lettuce: action.ingredients.lettuce,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updatedObject(state, {error: true});
};

const reducer = (state = initialState, action) => {
      switch(action.type) {
          case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
              // old way before using utility
              // return {
              //     // deep clone. immutable
              //     ...state,
              //     ingredients: {
              //         ...state.ingredients,
              //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
              //     },
              //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
              // };
          case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
          case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
          case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
          default: return state;
      // eslint-disable-next-line
      };
};

export default reducer;
