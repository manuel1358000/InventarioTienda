
import React, {Component} from 'react';
import { BackAndroid,BackHandler,NetInfo,ActivityIndicator,FlatList,AppRegistry,Platform, StyleSheet, Text, View,TextInput, Image,Button, Alert,ImageBackground,ScrollView} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
class Lista extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }


  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp(); // works best when the goBack is async
      return true;
    });
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });
        Alert.alert('Informacion','Cargando Cupones')
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <ImageBackground
          source={require('./sources/fondo9.png')}
          style={styles.container_nuevo}>
          
          <View style={styles.container_nuevo}>
              <FlatList 
                numColumns={2}
                data={this.state.dataSource}
                renderItem={({item}) =><View > 
                                          <Card style={styles.container_items}>
                                            <CardImage 
                                              source={{uri: 'http://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9647d95a500b5e222258fb03ed086ed1&auto=format&fit=crop&w=500&q=60'}}
                                            />
                                            <CardContent text={item.title} />
                                              <CardAction 
                                                separator={true} 
                                                inColumn={false}>
                                                <CardButton
                                                  onPress={() => Alert.alert('Avanzo al cupon')}
                                                  title="Ver Cupon"
                                                  color="#FEB557"
                                                />
                                            </CardAction>
                                          </Card>
                                        </View>
                                        }
                keyExtractor={(item, index) => index.toString()}
              />
          </View>         
      </ImageBackground>
    );
  }
}

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
    backgroundColor: 'rgba(255,255,255,1)',
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
export default Lista;