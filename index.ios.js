import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './main';

export default class RegistryProject extends Component {

render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('RegistryProject', () => RegistryProject);
