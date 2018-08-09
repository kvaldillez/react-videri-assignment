import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import MediaContent from '../../containers/MediaContent';

const Container = styled.div`
  height: 200vh;
  background: #f7f7f7;
`;

const Content = styled.div`
  padding: 16.6rem 0;
`;

const AccountPage = props => (
  <Container>
    <Content>
      <Route path={props.match.url + '/:folder'} component={MediaContent} />
    </Content>
  </Container>
);

AccountPage.propTypes = {
  getMedia: PropTypes.func.isRequired,
};

export default AccountPage;
