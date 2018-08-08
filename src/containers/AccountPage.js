import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginPageContainer extends Component {
  componentDidMount() {}

  render() {
    return <div>This is the account page!</div>;
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(LoginPageContainer);
