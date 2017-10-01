import React from 'react';
import Login from 'src/screens/Login';
import Project from 'src/screens/Project';
import Projects from 'src/screens/Projects';
import Settings from 'src/screens/Settings';
import Editor from 'src/screens/Editor';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';

const DrawerContent = StackNavigator(
  {
    settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Gist Editor',
      },
    },
    projects: {
      screen: Projects,
      navigationOptions: {
        title: 'Gist Editor',
      },
    },
    project: {
      screen: Project,
      navigationOptions: {
        title: 'Gists',
      },
    },
  },
  {
    initialRouteName: 'projects',
  }
);

const ContentNavigation = DrawerNavigator(
  {
    editor: {
      screen: Editor,
    },
  },
  {
    contentComponent: () => (
      <DrawerContent />
    ),
  },
);

const MainNavigation = StackNavigator(
  {
    login: {
      screen: Login,
    },
    content: {
      screen: ContentNavigation,
    },
  },
  {
    initialRouteName: 'login',
    headerMode: 'none',
  }
);

export default MainNavigation;
