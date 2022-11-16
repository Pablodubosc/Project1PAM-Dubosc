import {SafeAreaView,View, TouchableOpacity, Image,  StyleSheet,Text,Modal } from 'react-native';


export default function MenuBar({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={ ()=> navigation.navigate("FAVORITES CHARACTERS")}>
              <Image source = {require('../../assets/favoritoVacio.png')} style={styles.buttonHome1}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={ ()=> navigation.navigate("RICK AND MORTY")}>
              <Image source = {require('../../assets/home.jpg')} style={styles.buttonHome2}></Image>
            </TouchableOpacity>                
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      position:'absolute',
      flext:2,
      backgroundColor: "#0096c7",
      width:130,
      top:625,
      height:50,
      borderColor:'black',
      borderWidth:2,
      borderRadius:15
    },
    container2: {
      backgroundColor: 'grey',
    },
    buttonHome1: {
      backgroundColor: 'grey',
      borderColor:'black',
      borderRadius:15,
      borderWidth:2,
      width:38,
      height:38,
      left:75,
      top:4
    },
    buttonHome2: {
        backgroundColor: 'grey',
        borderColor:'black',
        borderRadius:15,
        borderWidth:2,
        width:40,
        height:40,
        top:-35,
        left:15,
      },
  });