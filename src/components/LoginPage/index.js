import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import bgImage from '../../assets/images/bg-login.png';

const Container = styled.div`
  height: 100vh;
  background: url(${bgImage}) no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding: 5rem 10rem;
  background-color: #fff;
  flex: 0 0 auto;
  width: 60%;
  max-width: 65rem;

  @media (max-width: 900px) {
    padding: 5rem;
  }

  @media (max-width: 600px) {
    padding: 3rem;
    width: 80%;
  }
`;

const Title = styled.h1`
  margin: 0 0 3rem;
  text-transform: uppercase;

  span {
    font-size: 3.2rem;
    letter-spacing: 1rem;
  }
`;

const Subtitle = styled.h2`
  margin: 0 0 2rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 0 0 2rem;
  padding: 0 1.5rem;
  height: 4.5rem;
  border: 0.2rem solid #ddd;
  font-size: 1.4rem;

  ::placeholder {
    font-weight: bold;
    text-transform: uppercase;
    opacity: 0.5;
  }

  &.valid {
    border-color: #34c064;
  }

  &.invalid {
    border-color: red;
  }
`;

const Button = styled.button`
  margin: 0 0 2rem;
  padding: 1.2rem;
  width: 19.6rem;
  align-self: flex-end;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: #34c064;
  text-transform: uppercase;
  cursor: pointer;
  color: #fff;
`;

const Error = styled.p`
  margin: 0 0 2rem;
  color: red;
`;

const LoginPage = props => (
  <Container>
    <Content>
      <Title>
        <span>Videri</span> Orchestrator
      </Title>
      <Subtitle>Sign In</Subtitle>
      <Form onSubmit={props.handleSubmitForm}>
        {props.formControlsArray.map(formElement => (
          <Input
            key={formElement.id}
            type={formElement.config.type}
            className={
              formElement.config.touched &&
              formElement.config.validation &&
              formElement.config.valid
                ? 'valid'
                : formElement.config.touched
                  ? 'invalid'
                  : null
            }
            placeholder={formElement.config.placeholder}
            onChange={e => props.handleChangeInput(e, formElement.id)}
          />
        ))}
        {props.displayErrorMessage && <Error>{props.errorMessage}</Error>}
        <Button type="submit">Sign In</Button>
      </Form>
    </Content>
  </Container>
);

LoginPage.propTypes = {
  formControlsArray: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ).isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  displayErrorMessage: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default LoginPage;
