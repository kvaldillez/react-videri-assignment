import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getMedia } from '../store/actions';
import Navigation from '../components/Navigation';
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
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        media: PropTypes.string,
        query: PropTypes.string,
      })
    ).isRequired,
  };

  componentDidMount() {
    this.checkMediaUpdate(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.folder !== newProps.match.params.folder) {
      this.checkMediaUpdate(newProps);
    }
  }

  checkMediaUpdate(props) {
    if (props.match.params.folder && props.folders) {
      const folder = props.folders.filter(
        obj => obj.url === props.match.params.folder
      );

      if (folder[0] && folder[0].media) {
        props.getMedia(folder[0].media, props.match.params.folder);
      }
    } else {
      this.props.getMedia('photos');
    }
  }

  render() {
    let account = <Spinner bgColor={'#fff'} />;

    if (!this.props.loading && !this.props.isLoggedIn) {
      account = <Redirect to="/" />;
    } else if (!this.props.loading) {
      account = (
        <Fragment>
          <Navigation user={this.props.user} folders={this.props.folders} />
          <AccountPageComponent
            mediaContent={this.props.media.content}
            loading={this.props.media.loading}
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
  folders: state.folders,
  media: state.media,
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
