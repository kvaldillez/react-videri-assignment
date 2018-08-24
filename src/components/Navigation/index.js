import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import folder from '../../assets/images/folder_off@2x.png';
import folderSelected from '../../assets/images/folder_on@2x.png';
import profileImage from '../../assets/images/profile-image.jpg';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  background: #1686c7;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.05rem;
`;

const Main = styled.div`
  display: flex;
  height: 6rem;
  align-items: center;
`;

const Icon = styled.button`
  padding: 2rem;
  background: #fff;
  height: 6rem;

  &::before {
    font: normal normal normal 2rem/1 FontAwesome;
    display: block;
    color: #1686c7;
    background: none;
    content: '\f00a';
  }
`;

const Title = styled.h1`
  padding: 0 2rem;
  text-transform: uppercase;
  font-size: 1.2rem;

  span {
    font-size: 2.2rem;
    letter-spacing: 0.6rem;
  }
`;

const Organization = styled.div`
  padding: 0.9rem 2rem;
  height: 6rem;
  line-height: 1.5;
  font-size: 1.2rem;
  background: #0f6a9e;

  span {
    font-size: 1.4rem;
    display: block;
  }
`;

const User = styled.div`
  padding: 0 2rem;
  margin-left: auto;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  margin-left: 1rem;
  background: url(${profileImage}) no-repeat center;
  background-size: cover;
  border-radius: 50%;
  display: inline-block;
  width: 4rem;
  height: 4rem;
`;

const Secondary = styled.div`
  padding: 2rem 1rem;
  background: #fff;
  color: #000;
  display: flex;

  a {
    text-decoration: none;
    color: #000;

    &.active {
      color: #2492b5;

      span {
        background-image: url(${folderSelected});
      }
    }
  }
`;

const Folder = styled.span`
  margin: 0 3rem;
  padding: 5rem 0 0;
  background: url(${folder}) no-repeat center top;
  background-size: auto 4rem;
  display: block;
  line-height: 1;
  font-size: 1.4rem;
  text-align: center;
  min-width: 4.4rem;
`;

const Navigation = ({ user, folders }) => (
  <Nav>
    <Main>
      <Icon />
      <Title>
        <span>Videri</span> Content
      </Title>
      <Organization>
        Organization
        <span>151 Pro-Serv</span>
      </Organization>
      <User>
        {user.id} <ProfileImage />
      </User>
    </Main>
    <Secondary>
      {folders.map(folder => (
        <NavLink
          to={`/account/${folder.url}`}
          activeClassName="active"
          key={folder.title}
        >
          <Folder>{folder.title}</Folder>
        </NavLink>
      ))}
    </Secondary>
  </Nav>
);

Navigation.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      media: PropTypes.string,
      query: PropTypes.string,
    })
  ).isRequired,
};

export default Navigation;
