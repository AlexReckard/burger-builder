import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../_Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };
        // will be called before the child components render
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        };

        // we call this lifecycle when a component isn't required anymore
        // helps to prevent memory leaks
        componentWillUnmount() {
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        };

        errorConfirmedHandler = () => {
            this.setState({error:null})
        };

        render () {
          return (
              <Aux>
                  <Modal
                      show={this.state.error}
                      modalClosed={this.errorConfirmedHandler}>
                      {this.state.error ? this.state.error.message : null}
                  </Modal>
                  <WrappedComponent {...this.props} />
              </Aux>
          );
      };
    };
};

export default withErrorHandler;
