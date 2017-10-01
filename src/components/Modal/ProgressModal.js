/*
 * @flow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal as ModalBase,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

const onRequestClose = () => null;

class ProgressModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };

  render() {
    const { visible } = this.props;
    return (
      <ModalBase
        visible={visible}
        onRequestClose={onRequestClose}
        transparent={true}
      >
        <View style={[styles.background, { alignItems: 'center' }]}>
          <ActivityIndicator size="large" />
        </View>
      </ModalBase>
    );
  }
}

export default ProgressModal;
