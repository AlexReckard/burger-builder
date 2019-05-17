import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const burgerBuilder = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    // state = {
        // now using redux
        // ingredients: null,
        // we are now fetching the data from firebase
        //     lettuce: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        // totalPrice: 4,
        // purchasable: false,
        // purchasing: false,
        // loading: false,
        // error: false
        const [purchasing, setPurchasing] = useState(false);

        useEffect(() => {
            props.onInitIngredients();
        }, []);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    // using redux
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };
    //
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        };
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    // using redux now
    const purchaseContinueHandler = () => {
    //     const queryParams = [];
    //     for(let i in this.state.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');
        props.onInitPurchase();
        props.history.push('/checkout');
            // pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    };

        const disableInfo = {
            // added the mapStateToProps instead
            ...props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        };
        let orderSummary = null;
        let burger = props.error ? <p>Ingredients can't be loaded :(</p> : <Spinner />

        // added the mapStateToProps instead
        if (props.ings) {
            burger = (
              <Aux>
                  {/*added the mapStateToProps instead}*/}
                  <Burger ingredients={props.ings}/>
                  <BuildControls
                      // added the mapDispatchToProps instead
                      ingredientAdded={props.onIngredientAdded}
                      ingredientRemoved={props.onIngredientRemoved}
                      disabled={disableInfo}
                      purchasable={updatePurchaseState(props.ings)}
                      ordered={purchaseHandler}
                      isAuth={props.isAuthenticated}
                      price={props.price}/>
              </Aux>
            );
            orderSummary = <OrderSummary
                  // added the mapStateToProps instead
                  ingredients={props.ings}
                  price={props.price}
                  purchaseCancelled={purchaseCancelHandler}
                  purchaseContinue={purchaseContinueHandler}/>;
        }
        return(
          <Aux>
            <Modal
              show={purchasing}
              modalClosed={purchaseCancelHandler}>
              {orderSummary}
            </Modal>
            {burger}
          </Aux>
        );
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
