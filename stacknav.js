import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View, TouchableOpacity,Image,Alert} from 'react-native';
import { StackNavigator,DrawerActions } from  'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import Lista from "./Lista";
import Detalle from "./Detalle";

const stackNav = StackNavigator({
  Lista : {
    screen: Lista,
    navigationOptions: ({navigation}) => ({
      title: "Cupones Disponibles",
      headerLeft:(<TouchableOpacity onPress={() =>navigation.openDrawer()}>
                    <Image
                      style={styles.icono}
                      source={require('./sources/menu.png')}
                    />
                  </TouchableOpacity>
      ),
      headerStyle: {  }
    })
  },
  Detalle: {
    screen: Detalle,
    navigationOptions: ({navigation}) => ({
      title: "Mis Cupones",
      headerLeft:(<TouchableOpacity onPress={() =>navigation.openDrawer()}>
                    <Image
                      style={styles.icono}
                      source={require('./sources/menu.png')}
                    />
                  </TouchableOpacity>
      ),
      headerStyle: {  }
    })     
  }
});
const styles = StyleSheet.create({
  icono: {
    left:20,
    height: 35,
    width: 35,
  },
});
export default stackNav;