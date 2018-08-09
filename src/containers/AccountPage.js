import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getMedia } from '../store/actions';
import Navigation from '../components/AccountPage/Navigation';
import AccountPageComponent from '../components/AccountPage';
import Spinner from '../components/UI/Spinner';

export class AccountPageContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
    getMedia: PropTypes.func.isRequired,
  };

  state = {
    folders: [
      { title: 'Clouds', url: 'clouds', media: 'photos', query: 'clouds' },
      { title: 'Cars', url: 'cars', media: 'photos', query: 'cars' },
      { title: 'Urban', url: 'urban', media: 'videos', query: 'urban' },
    ],
  };

  componentDidMount() {
    this.props.getMedia('photos');

    console.log(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    let account = <Spinner />;

    if (!this.props.loading && !this.props.isLoggedIn) {
      account = <Redirect to="/" />;
    } else if (!this.props.loading) {
      account = (
        <Fragment>
          <Navigation
            user={this.props.user}
            folders={this.state.folders}
            getMedia={this.props.getMedia}
          />
          <AccountPageComponent
            getMedia={this.props.getMedia}
            match={this.props.match}
          />
        </Fragment>
      );
    }

    return account;
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  isLoggedIn: state.isLoggedIn,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getMedia: (media, query) => dispatch(getMedia.request(media, query)),
});

AccountPageContainer.defaultProps = {
  user: { id: null },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageContainer);
