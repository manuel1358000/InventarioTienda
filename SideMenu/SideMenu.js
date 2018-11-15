import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.navSectionStyle} >
              Opciones
            </Text>
            <View style={styles.sectionHeadingStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Lista')}>
                Lista General Cupones
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Detalle')}>
                Mis Cupones
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={styles.navItemStyle2}>Cerrar Sesion</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;