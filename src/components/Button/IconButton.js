/*
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import { colorType } from 'src/utils/propTypes';
import { TouchableOpacity } from 'react-native';
import { default as FAIcon } from 'react-native-vector-icons/FontAwesome';
import { default as OCTIcon } from 'react-native-vector-icons/Octicons';

import styles from './styles';

export const IconButtonWrapper = ({
  disabled,
  color,
  disabledColor,
  style,
  children,
  ...touchable,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.touchable, {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: disabled ? disabledColor : color,
    }, style]}
    {...touchable}>
    {children}
  </TouchableOpacity>
);

IconButtonWrapper.propTypes = {
  disabled: PropTypes.bool,
  color: colorType,
  disabledColor: colorType,
  style: PropTypes.any,
  children: PropTypes.node,
};

IconButtonWrapper.defaultProps = {
  disabled: false,
  color: 0x999999ff,
  disabledColor: 'transparent',
  style: null,
  children: null,
};

export const IconButton = ({
  name,
  size,
  disabled,
  color,
  disabledColor,
  style,
  iconStyle,
  iconClass: IconClass,
  ...touchable
}) => (
  <IconButtonWrapper
    disabled={disabled}
    disabledColor={disabledColor}
    style={style}
    {...touchable}
  >
    <IconClass
      name={name}
      size={size}
      color={disabled && disabledColor || color}
      style={iconStyle}
    />
  </IconButtonWrapper>
);

const iconButtonPropTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  color: colorType,
  disabledColor: colorType,
  style: PropTypes.any,
};

IconButton.propTypes = {
  iconClass: PropTypes.func.isRequired,
  ...iconButtonPropTypes,
};

IconButton.defaultProps = {
  size: 30,
  disabled: false,
  color: '#000',
  disabledColor: '#999',
  style: null,
};

export const FAIconButton = (props) => (
  <IconButton
    iconClass={FAIcon}
    {...props}
  />
);

FAIconButton.propTypes = {
  ...iconButtonPropTypes,
};

FAIconButton.defaultProps = {};

export const OCTIconButton = (props) => (
  <IconButton
    iconClass={OCTIcon}
    {...props}
  />
);

OCTIconButton.propTypes = {
  ...iconButtonPropTypes,
};

OCTIconButton.defaultProps = {};

export default IconButton;
