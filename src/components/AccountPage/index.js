import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Spinner from '../UI/Spinner';

const Container = styled.div`
  height: 100vh;
  background: #f7f7f7;
`;

const Content = styled.div`
  padding: 16.6rem 0;
`;

const AccountPage = ({ mediaContent, loading }) => {
  let content = <Spinner bgColor={'#f7f7f7'} />;

  if (!loading) {
    content = mediaContent.map(item => (
      <img key={item.id} src={item.previewURL} alt={item.tags} />
    ));
  }

  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};

AccountPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  mediaContent: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      previewURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};

export default AccountPage;
