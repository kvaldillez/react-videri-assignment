import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import baseStyles from './baseStyles';
import { checkUserState } from './store/actions';
import Router from './router';

class App extends Component {
  static propTypes = {
    checkUserState: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.checkUserState();
  }

  render() {
    baseStyles();

    return (
      <Fragment>
        {this.props.children}
        <Router isLoggedIn={this.props.isLoggedIn} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  checkUserState: () => dispatch(checkUserState.request()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
