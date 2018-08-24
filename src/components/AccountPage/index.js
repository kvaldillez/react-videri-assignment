import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spinner from '../UI/Spinner';
import imageIcon from '../../assets/images/image@2x.png';
import videoIcon from '../../assets/images/video@2x.png';

const Container = styled.div`
  min-height: 100vh;
  background: #f7f7f7;
`;

const Content = styled.div`
  padding: 16.6rem 1.5rem;
`;

const Title = styled.h2`
  padding: 2rem 0;
  font-size: 1.4rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const MediaContainer = styled.div`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MediaItem = styled.div`
  background-color: #fff;
  display: flex;
  padding: 1rem 0.5em;
`;

const MediaImage = styled.div`
  margin-right: 1rem;
  background: ${({ src }) => `url(${src}) center no-repeat`};
  background-size: contain;
  width: 45%;
`;

const MediaTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
`;

const MediaIcon = styled.img`
  background: ${({ src }) => `url(${src}) center no-repeat`};
  background-size: cover;
  width: 2.5rem;
  height: auto;
`;

const AccountPage = ({ mediaContent, loading }) => {
  let content = <Spinner bgColor={'#f7f7f7'} />;

  if (!loading) {
    content = mediaContent.map(media => {
      let item;
      if (media.type === 'photo') {
        let title = media.previewURL.split('/');
        title = title[title.length - 1];

        item = (
          <MediaItem key={media.id}>
            <MediaImage src={media.previewURL} />
            <div>
              <MediaTitle>{title}</MediaTitle>
              <MediaIcon src={`${imageIcon}`} />
              <br />
              200x200
            </div>
          </MediaItem>
        );
      } else if (media.type === 'film') {
        item = (
          <MediaItem key={media.id}>
            <MediaImage
              src={`https://i.vimeocdn.com/video/${
                media.picture_id
              }_200x150.jpg`}
            />
            <div>
              Test
              <br />
              <MediaIcon src={`${videoIcon}`} />
              <br />
              200x200
            </div>
          </MediaItem>
        );
      }

      return item;
    });
  }

  return (
    <Container>
      <Content>
        <Title>Content</Title>
        <MediaContainer>{content}</MediaContainer>
      </Content>
    </Container>
  );
};

AccountPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  mediaContent: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      previewURL: PropTypes.string,
      picture_id: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};

export default AccountPage;
