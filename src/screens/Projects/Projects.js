/*
 * @flow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { OCTIconButton, FAIconButton } from 'src/components/Button';
import Text, { Heading } from 'src/components/Text';
import ProjectItem from './ProjectItem';

import styles from './styles';

class Projects extends Component {

  static propTypes = {
    fetchList: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      comments: PropTypes.number.isRequired,
      files: PropTypes.object.isRequired,
      href: PropTypes.string.isRequired,
      gist: PropTypes.object,
      gistId: PropTypes.string,
    })).isRequired,
    userLogin: PropTypes.string,
  };

  static defaultProps = {
    list: [],
    userLogin: '',
  };

  state = { selected: '' };

  componentWillMount() {
    this.props.fetchList();
  }

  componentWillReceiveProps(props) {
  }

  handleSelect = (id) => {
    this.setState({ selected: id });
  };

  render() {
    const { selected } = this.state;

    return (
      <View style={{ flex: 1, }}>
        <ScrollView>
          {this.props.list.map((item) => (
            <ProjectItem
              key={item.id}
              project={item}
              onSelect={this.handleSelect}
              selected={item.id === selected}
            />
          ))}
          <View style={{ height: 30, }} />
        </ScrollView>
      </View>
    );
  }
}

export default Projects;
