/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NetInfo,FlatList,AppRegistry,Platform, StyleSheet, Text, View,TextInput, Image,Button, Alert,ImageBackground, Navigator,ScrollView} from 'react-native';
import { createStackNavigator} from 'react-navigation';
import Menu from "./Menu";
class App extends Component{
  constructor(props){
      super(props)
      this.state ={ isLoading: true}
    } 
  componentDidMount(){
    NetInfo.isConnected.fetch().done((isConnected) => {
        if ( isConnected ){
        // Run your API call
          try{
            fetch('http://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
              var respuesta=responseJson.movies[0].id.toString()
              if(respuesta=='1'){
                this.props.navigation.pop()
                this.props.navigation.navigate('Menu')
              }else{
              }
            })
            .catch((error) => {
              console.error(error);
            });
          }catch(error){
            Alert.alert('Informacion','Verifique su conexion a internet ' + error)
          }
        }else{
          // Ideally load from local storage
          Alert.alert('Informacion','Verifique su conexion a internet')
        }
      });
  }
  static navigationOptions = ({navigation})=>({
    //opciones de la pantalla actual
  });
    crearcuenta = () => {
      Alert.alert('Informacion','Crear Cuenta',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this.props.navigation.navigate('Crear_cuenta')
    }
    recuperar = () => {
      this.props.navigation.navigate('Recuperar')
    } 
    state = {
      correo: '',
      contra2: '',
      contra: '',
      nombre: '',
      usu: ''
    }
    handleUsuario = (text) => {
      this.setState({ usu: text })
    }
    handleContra = (text) => {
      this.setState({ contra: text })
    }
    
    login = (usu, contra) => {
      let obj={}
      obj.usu=usu;
      obj.contra=contra
      NetInfo.isConnected.fetch().done((isConnected) => {
        if ( isConnected ){
        // Run your API call
          try{
            fetch('http://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
              var respuesta=responseJson.movies[0].id.toString()
              if(respuesta=='1'){
                Alert.alert('Informacion','Bienvenido, Cargando cupones')
                this.props.navigation.navigate('Menu')
              }else{
                Alert.alert('Informacion','No pudo iniciar sesion')
              }
            })
            .catch((error) => {
              console.error(error);
            });
          }catch(error){
            Alert.alert('Informacion','Verifique su conexion a internet ' + error)
          }
        }else{
          // Ideally load from local storage
          Alert.alert('Informacion','Verifique su conexion a internet')
        }
      });
      
    }
        
  render(){
    return (
      <ImageBackground
          source={require('./sources/fondo.png')}
          style={styles.container}> 
              
                  <Image style={styles.imagen}
                        source={require('./sources/LogoNuevo.png')}
                    />
                <View style={styles.container2}>
                  <View style={styles.boton_redes}>
                    <Button 
                        onPress = {
                                () => this.login(this.state.usu, this.state.contra)
                            }
                            icon={{name: 'cached'}}
                            title="LogIn Gmail"
                            color="#34495e"
                    />
                  </View>
                  <TextInput style={styles.cajastexto}
                      editable = {true}
                      placeholder = "Ingrese Usuario"
                      onChangeText={this.handleUsuario}
                    />
                    <Text></Text>
                  <TextInput style={styles.cajastexto}
                      editable = {true}
                      placeholder = "Ingrese Contraseña"
                      secureTextEntry={true} 
                      onChangeText={this.handleContra}
                    />
                    <View style={styles.boton}>
                    <Button 
                        onPress = {
                                () => this.login(this.state.usu, this.state.contra)
                            }
                            icon={{name: 'cached'}}
                            title="Iniciar Sesion"
                        color="#d63031"
                    />
                  </View>
                  <Text style={styles.texto_recuperar}
                    onPress = {() => this.recuperar()}>Recuperar Contraseña</Text>
                  <Text style={styles.texto_crear}
                    onPress = {() => this.crearcuenta()}>Crear Cuenta</Text>
              </View> 
        
      </ImageBackground>      
    );
  }
}

class Crear_cuenta extends React.Component {
  constructor(props){
    super(props)
    this.micorreo = React.createRef();
    this.micontra = React.createRef();
    this.micontra2 = React.createRef();
  }
  
  state = {
      correo: 'vacio',
      contra2: '',
      contra: '',
      nombre: '',
      usu: '',
      color:'black',
    }
    handleUsuario = (text) => {
      this.setState({ usu: text })
    }
    handleNombre = (text) => {
      this.setState({ nombre: text })
    }
    handleCorreo = (text) => {
      this.setState({ correo: text })
    }
    handleContra = (text) => {
      this.setState({ contra: text })
    }
    handleContra2 = (text) => {
      this.setState({ contra2: text })
    }
    boton_crear = (nombre, correo,usuario,contra,contra2) => {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      
      if(nombre==''||correo==''||usuario==''||contra==''||contra2==''){
        Alert.alert('Informacion','Falta ingresar uno de los campos')
      }else{
        if(contra==contra2){
          if (reg.test(correo) == true){

            this.props.navigation.navigate('App')
            Alert.alert('Informacion','Gracias por registrarte, ahora puedes empezar a disfrutar de las mejores promociones en MiCuponGt')
          }
          else{
            Alert.alert('Informacion','Correo invalido')
            this.micorreo.current.clear()
          }
          
        }else{
          Alert.alert('Informacion','Contraseña no coincide, vuelva a intentarlo')
          this.micontra.current.clear()
          this.micontra2.current.clear()
        }
      }
    }
  render() {
    return (
      <ImageBackground
          source={require('./sources/fondo2.png')}
          style={styles.container}>
          <View style={styles.container3}>
            <Text style={{top:-30,fontSize:12, color: 'white',fontWeight: 'bold'}}>Por favor ingrese los siguientes datos</Text>
            <TextInput style={styles.cajastexto2}
              editable = {true}
              placeholder = "Nombre Completo"
              onChangeText={this.handleNombre}
            />
            <TextInput ref={this.micorreo} style={styles.cajastexto2}
              editable = {true}
              placeholder = "Correo Electronico"
              onChangeText={this.handleCorreo}
              autocorrect='false'
            />
            <TextInput style={styles.cajastexto2}
              editable = {true}
              placeholder = "Usuario"
              onChangeText={this.handleUsuario}
            />
            <TextInput ref={this.micontra} style={styles.cajastexto2}
              editable = {true}
              placeholder = "Contraseña"
              secureTextEntry={true} 
              onChangeText={this.handleContra}
            />
            <TextInput ref={this.micontra2} style={styles.cajastexto2}
              editable = {true}
              placeholder = "Confirmar Contraseña"
              secureTextEntry={true} 
              onChangeText={this.handleContra2}
            />
            <View style={{top: 20, width:150}}>
              <Button 
                onPress = {
                  () => this.boton_crear(this.state.nombre, this.state.correo,this.state.usu,this.state.contra,this.state.contra2)
                }
                icon={{name: 'cached'}}
                title="Crear Cuenta"
                color="#d63031"
              />
            </View>
          </View>
        </ImageBackground>
    );
  }
}

class Recuperar extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
      valor:'150',
    }
  render() {
    return (
    <ImageBackground
          source={require('./sources/fondo4.png')}
          style={styles.container}>
          <View style={StyleSheet.flatten([styles.container2,{top:80}])}>
            <TextInput ref={this.micontra2} style={styles.cajastexto2}
              editable = {true}
              placeholder = "Ingresar Correo Electronico"
              secureTextEntry={true} 
              onChangeText={this.handleContra2}
            />
            <View style={{top: 20, width:150}}>
              <Button 
                onPress = {
                  () => this.boton_crear(this.state.nombre, this.state.correo,this.state.usu,this.state.contra,this.state.contra2)
                }
                icon={{name: 'cached'}}
                title="Enviar"
                color="#d63031"
              />
            </View>
          </View>

    </ImageBackground>
    );
  }
}

const Apps = createStackNavigator({
    App:{ screen: App, 
      navigationOptions: ({navigation})=>({
        //opciones de la pantalla actual
        title: '',
        headerTitleStyle:{color: 'white'},
        headerStyle:{
          backgroundColor: '#34495e',
          height:0,
        },
      }),  
    },
    Crear_cuenta:{ screen: Crear_cuenta, 
      navigationOptions: ({navigation})=>({
        //opciones de la pantalla actual
        title: 'Crear Cuenta',
        headerTitleStyle:{color: 'black'},
        headerStyle:{
          backgroundColor: 'white',
        },
      }),
    },
    Recuperar:{ screen: Recuperar, 
      navigationOptions: ({navigation})=>({
        //opciones de la pantalla actual
        title: 'Recuperar Contraseña',
        headerTitleStyle:{color: 'black'},
        headerStyle:{
          backgroundColor: 'white',
        }, 
      }),
    },
    Menu:{ screen: Menu, 
      navigationOptions: ({navigation})=>({
        //opciones de la pantalla actual
        title: '',
         headerLeft: null,
        headerTitleStyle:{color: 'black'},
        headerStyle:{
          backgroundColor: 'white',
          height:0,
        },
      }),
    },
 });



const styles = StyleSheet.create({
  cajastexto: {
    top:10,
    height: 40, 
    width:225, 
    borderColor: 'grey', 
    backgroundColor: 'rgba(255,255,255,255.50)',
    borderRadius:10,
    textAlign: 'center'
  }, 
  cajastexto2: {
    top:5,
    margin: 5,
    height: 40, 
    width:225, 
    borderColor: 'grey', 
    backgroundColor: 'rgba(255,255,255,255.50)',
    borderRadius:10,
    textAlign: 'center'
  }, 
  container:{
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#f1f2f6',
  }, 
  container2:{
    top: -30,
    height: 280, 
    width:275,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.50)',
  },
  container3:{
    top: 0,
    height: '100%', 
    width:275,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.50)',
  },
  boton:{
    top: 30,
    position: 'relative',
    bottom: 0,
    width:225,
  },
  boton_redes:{
    top: -15,
    width:225,
  },
  texto_recuperar:{
    top: 45,
    left: 50,
    fontSize: 12,
    color: 'white',
  },
  texto_crear:{
    top: 30,
    left: -70,
    fontSize: 12,
    color: 'white', 
  },
  imagen:{
    top:15,
    left:0,
    right:20, 
    bottom:0,
  },
  item: {
    fontSize: 18,
    color:'black',
  },
  container_items: {
    height: 200,
    width: 140,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  container_nuevo: {
    flex: 1,
    paddingTop: 0,
  },
  container_nuevo2: {
    flex: 1,
    paddingTop: -100,
    left: 150,
  },
});
export default Apps;
AppRegistry.registerComponent('App',()=>App);
AppRegistry.registerComponent('App',()=>Menu);
AppRegistry.registerComponent('App',()=>Recuperar);
AppRegistry.registerComponent('App',()=>Crear_cuenta);