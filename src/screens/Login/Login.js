/*
 * @flow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import GithubSignIn from 'GithubSignIn';
import { ProgressModal } from 'src/components/Modal';
import { CLIENT_ID, CLIENT_SECRET } from './client';

import styles from './styles';

class Login extends Component {

  static propTypes = {
    onLoginStart: PropTypes.func.isRequired,
    onLoginError: PropTypes.func.isRequired,
    onLoginSuccess: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    accessToken: PropTypes.string,
    userLogin: PropTypes.string,
  };

  static defaultProps = {
    accessToken: '',
    userLogin: '',
  };

  state = { visible: false, isComplete: false };

  componentDidMount() {
    const { accessToken, userLogin, fetchUser } = this.props;
    if (!accessToken) {
      this.setState({ visible: true });
      return;
    }

    if (userLogin) {
      this.navigateNext();
      return;
    }

    fetchUser()
      .catch(() => {
        this.setState({ visible: true });
      });
  }

  componentWillReceiveProps({ userLogin }) {
    console.log('userLogin', userLogin);
    if (userLogin) {
      this.navigateNext();
    }
  }

  navigateNext() {
    const { navigation } = this.props;
    this.setState(
      { visible: false },
      () => {
        navigation.navigate('content');
      });
  }

  handleSignInComplete = (data) => {
    console.log('COMPLETE!', data);
    this.props.onLoginSuccess(data);
    this.props.fetchUser();
  };

  handleSignInError = (error) => {
    console.log('ERROR!', error);
    this.props.onLoginError(error);
  };

  handleCodeReceived = (code) => {
    console.log('RECEIVED!', code);
    this.setState({ isComplete: true });
  };

  render() {
    const { visible, isComplete } = this.state;
    if (!visible) {
      return null;
    }

    return (
      <View style={styles.container}>
        <GithubSignIn
          clientId={CLIENT_ID}
          clientSecret={CLIENT_SECRET}
          scope="user gist"
          onCodeReceived={this.handleCodeReceived}
          onSignInComplete={this.handleSignInComplete}
          onSignInError={this.handleSignInError}
        />
        <ProgressModal visible={!visible || isComplete} />
      </View>
    );
  }
}

export default Login;
