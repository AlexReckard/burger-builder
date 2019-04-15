import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updatedObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
              name: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Your Name'
                  },
                  value: '',
                  validation: {
                      required: true
                  },
                  valid: false,
                  touched: false
              },
              street: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Street'
                  },
                  value: '',
                  validation: {
                      required: true
                  },
                  valid: false,
                  touched: false
              },
              zipCode: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'ZIP Code'
                  },
                  value: '',
                  validation: {
                      required: true,
                      minLength: 5,
                      maxLength: 5,
                      isNumeric: true
                  },
                  valid: false,
                  touched: false
              },
              country: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Country'
                  },
                  value: '',
                  validation: {
                      required: true
                  },
                  valid: false,
                  touched: false
              },
              email: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'email',
                      placeholder: 'example@email.com'
                  },
                  value: '',
                  validation: {
                      required: true,
                      isEmail: true
                  },
                  valid: false,
                  touched: false
              },
              deliveryMethod: {
                  elementType: 'select',
                  elementConfig: {
                      options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                      ]
                  },
                  value: 'fastest',
                  validation: {},
                  valid: true
              }
        },
        formIsValid: false,
        loading: false
    };

    // moved checkValidity() to shared folder. Added to Auth.js in Auth container

    //preventDefault using the event prop will stop sending a request and reloading the page
    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loading: true})
        const formData = {};
        // email, name, country... etc.
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        };
        const order = {
            // add mapStateToProps
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
        // for firebase to work use node name.json
        // using it in actions now
        // axios.post('/orders.json', order)
        //     .then(response => {
        //       this.setState({loading: false});
        //       this.props.history.push('/');
        //     })
        //       // if an error occurs we want to stop the loading process
        //     .catch(error => {
        //       this.setState({loading: false});
        //     });
    };

    // added utility
    // using updatedObject() in shared folder for deep cloning
    // using checkValidity() in shared folder for validation
    inputChangedHandler = (event, id) => {
        const updatedFormElement = updatedObject(this.state.orderForm[id], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[id].validation),
            touched: true
        });
        const updatedOrderForm = updatedObject(this.state.orderForm, {
            [id]: updatedFormElement
        });
        let formIsValid = true;
        for (let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        };
        let form = (
          <form onSubmit={this.orderHandler}>
              {formElementsArray.map(formElement => (
                  <Input
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      invalid={!formElement.config.valid}
                      shouldValidate={formElement.config.validation}
                      touched={formElement.config.touched}
                      changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
              ))}
              <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
          </form>
        );
        // now using mapStateToProps instead
        if (this.props.loading) {
          form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
