import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
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
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount () {
        // axios.get('https://burger-builder-1215.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    };

    updatePurchaseState(ingredients) {
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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    // using redux now
    purchaseContinueHandler = () => {
    //     const queryParams = [];
    //     for(let i in this.state.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
            // pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    };

    render() {
        const disableInfo = {
            // added the mapStateToProps instead
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        };
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded :(</p> : <Spinner />

        // added the mapStateToProps instead
        if (this.props.ings) {
            burger = (
              <Aux>
                  {/*added the mapStateToProps instead}*/}
                  <Burger ingredients={this.props.ings}/>
                  <BuildControls
                      // added the mapDispatchToProps instead
                      ingredientAdded={this.props.onIngredientAdded}
                      ingredientRemoved={this.props.onIngredientRemoved}
                      disabled={disableInfo}
                      purchasable={this.updatePurchaseState(this.props.ings)}
                      ordered={this.purchaseHandler}
                      price={this.props.price}/>
              </Aux>
            );
            orderSummary = <OrderSummary
                  // added the mapStateToProps instead
                  ingredients={this.props.ings}
                  price={this.props.price}
                  purchaseCancelled={this.purchaseCancelHandler}
                  purchaseContinue={this.purchaseContinueHandler}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return(
          <Aux>
            <Modal
              show={this.state.purchasing}
              modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
            </Modal>
            {burger}
          </Aux>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
