/*
 * @flow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { default as OCTIcon } from 'react-native-vector-icons/Octicons';
import { LinkButton, OCTIconButton, FAIconButton } from 'src/components/Button';
import Text, { Heading } from 'src/components/Text';

import styles from './styles';

class ProjectItem extends Component {

  static propTypes = {
    project: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      comments: PropTypes.number.isRequired,
      files: PropTypes.object.isRequired,
      href: PropTypes.string.isRequired,
      gist: PropTypes.object,
      gistId: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    list: [],
    userLogin: '',
  };

  componentWillMount() {
  }

  componentWillReceiveProps(props) {
  }

  shouldComponentUpdate({ selected: newSelected, project: newProject }) {
    const { selected, project } = this.props;
    return selected != newSelected || project !== newProject;
  }

  handleSelect = () => {
    const { project: { id } } = this.props;
    this.props.onSelect(id);
  };

  renderDescription() {
    const { project: { description } } = this.props;

    if (!description) {
      return null;
    }

    return (
      <Text style={{
        flex: 1,
        fontSize: 10,
        color: 0x000000ff,
        textAlignVertical: 'center',
        backgroundColor: 0xEEEEEEFF,
        marginTop: 4,
        padding: 4,
        borderRadius: 4,
      }}>
        {description}
      </Text>
    );
  }

  renderToolbar() {
    if (!this.props.selected) {
      return null;
    }

    return (
      <View style={{
        marginTop: 4,
        flexDirection: 'row',
      }}>
        <FAIconButton
          name="share-alt"
          size={18}
          style={[styles.iconButton, { paddingLeft: 0 }]}
        />
        <OCTIconButton
          name="cloud-download"
          size={18}
          style={[styles.iconButton, { marginLeft: 'auto' }]}
        />
        <OCTIconButton
          name="sync"
          size={18}
          style={[styles.iconButton, { marginRight: 20 }]}
        />
        <OCTIconButton
          name="trashcan"
          size={18}
          color="#f00"
          style={styles.iconButton}
        />
      </View>
    );
  }

  renderFiles() {
    const { selected, project: { files } } = this.props;
    if (!selected) {
      return null;
    }
    return (
      <View style={{
        alignItems: 'stretch',
        paddingVertical: 10,
      }}>
        {
          files.map(({ name }, index) => (
            <View style={{
              flexDirection: 'row',
              padding: 10,
              paddingRight: 0,
              backgroundColor: index % 2 ? 0xFFFFFFFF : 0xFAFAFAFF
            }}>
              <OCTIcon name="file-text" size={20} style={{ marginRight: 5 }} />
              <Text style={{ flex: 1, fontSize: 16 }}>
                {name}
              </Text>
              <OCTIconButton
                name="trashcan"
                size={18}
                color="#f00"
                style={[styles.iconButton, { marginLeft: 'auto' }]}
              />
            </View>
          ))
        }
        <LinkButton label="Add File" style={{ fontSize: 16 }} />
      </View>
    );
  }

  render() {
    const { project: { title, comments } } = this.props;
    return (
      <View style={{
        padding: 5,
        marginBottom: 5,
        backgroundColor: 0xFFFFFFFF,
        borderBottomWidth: 1,
        borderColor: 0xAAAAAAFF,
        minHeight: 60,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <OCTIconButton
            name="pin"
            size={18}
            style={{
              width: 26,
              height: 26,
              marginRight: 5,
            }}
          />
          <TouchableOpacity
            onPress={this.handleSelect}
            style={{
              flex: 1,
            }}
          >
            <Heading
              style={{
                flex: 1,
                fontSize: 16,
                color: 0x333333FF,
                textAlign: 'left',
                flexWrap: 'wrap',
              }}
            >
              {title}
            </Heading>
          </TouchableOpacity>
          <Text
            style={{
              color: 0xFFFFFFFF,
              fontSize: 12,
              borderRadius: 10,
              backgroundColor: 0x3333FF99,
              width: 20,
              height: 20,
              marginHorizontal: 7,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}
          >
            {comments}
          </Text>
        </View>
        {this.renderDescription()}
        {this.renderToolbar()}
        {this.renderFiles()}
      </View>
    );
  }
}

export default ProjectItem;
