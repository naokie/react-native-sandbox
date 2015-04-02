/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var CarSearchList = require('./CarSearchList');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

class Anyca extends React.Component {
  render() {
    return (
      <NavigatorIOS style={styles.container} initialRoute={{
        component: CarSearchList,
        title: 'Anyca'
      }} />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('reactNativeSandbox', () => Anyca);
