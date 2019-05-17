import React, {} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {

    // state = {
    //     ingredients: null,
    //     price: 0
    // };

    // manipulation to add ingredients via link
    // using redux now
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = null;
    //     for (let param of query.entries()) {
    //       // lettuce, 1
    //       if (param[0] === 'price') {
    //           price = param[1];
    //       } else {
    //           ingredients[param[0]] = +param[1];
    //       }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // };

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    // Redirect to the homepage
        let summary = <Redirect to="/"/>
        if (props.ings) {
            const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={props.ings}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler}/>
                    <Route
                        path={props.match.path + '/contact-data' }
                        component={ContactData} />
                        {/*render={(props) => (
                            <ContactData
                                ingredients={this.state.ingredients}
                                price={this.state.totalPrice}
                                {...props}/>)}/> */}
                </div>
            );
        }
        return summary;
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(checkout);
