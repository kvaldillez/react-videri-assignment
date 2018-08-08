import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginPageComponent from '../components/LoginPage';
import { checkValidity } from '../utilities';
import { loginUser } from '../store/actions';

export class LoginPageContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  state = {
    formControls: {
      username: {
        type: 'email',
        placeholder: 'USERNAME',
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        type: 'password',
        placeholder: 'PASSWORD',
        value: '',
        validation: {
          required: true,
          isPassword: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
      },
    },
    displayErrorMessage: false,
    errorMessage: '',
  };

  componentDidMount() {}

  handleChangeInput = (e, key) => {
    const updatedControls = {
      ...this.state.formControls,
      [key]: {
        ...this.state.formControls[key],
        value: e.target.value,
        touched: true,
        valid: checkValidity(
          e.target.value,
          this.state.formControls[key].validation
        ),
      },
    };

    this.setState({ formControls: updatedControls });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    let submitForm = true;
    const errors = [];

    for (const key in this.state.formControls) {
      if (!this.state.formControls[key].valid) {
        errors.push(`${key}`);
        submitForm = false;
      }
    }

    this.setState({
      errorMessage: `Please fix the ${errors.join(' and ')} input(s) above.`,
    });

    if (submitForm) {
      this.setState({ displayErrorMessage: false });
      this.props.loginUser(this.state.formControls.username.value);
    } else {
      this.setState({ displayErrorMessage: true });
    }
  };

  render() {
    const formControlsArray = [];

    for (const key in this.state.formControls) {
      formControlsArray.push({
        id: key,
        config: this.state.formControls[key],
      });
    }

    return (
      <LoginPageComponent
        loading={this.props.loading}
        formControlsArray={formControlsArray}
        displayErrorMessage={this.state.displayErrorMessage}
        errorMessage={this.state.errorMessage}
        handleSubmitForm={this.handleSubmitForm}
        handleChangeInput={this.handleChangeInput}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  loginUser: id => dispatch(loginUser.request(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
