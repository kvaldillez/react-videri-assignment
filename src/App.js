import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import baseStyles from './baseStyles';
import { checkUserState } from './store/actions';
import Router from './router';

const AppContainer = styled.div`
  width: 100%;
`;

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
      <AppContainer>
        <Router isLoggedIn={this.props.isLoggedIn} />
      </AppContainer>
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
