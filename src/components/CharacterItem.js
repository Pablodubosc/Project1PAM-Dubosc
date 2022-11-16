import {View,TouchableOpacity, Image,  StyleSheet,Text,FlatList,Animated } from 'react-native';
import React, { useEffect, useState } from "react";
import { useApi } from '../hooks/useApi';
import { setModalItem,setModalCharacterVisible, } from '../store/Reducers';
import { useDispatch, useSelector } from 'react-redux';
export default function CharacterItem({item,favorite,removeFromList}) {
  const dispatch = useDispatch();  
  const { writeCharacterData,deleteCharacterData} = useApi();
    const value = useState(new Animated.Value(0))[0];
    const size = useState(new Animated.Value(1))[0];
    const animateCard = () => {
        Animated.parallel([
            Animated.timing(value, {
                toValue: favorite? -550:550,
                duration: 1100,
                useNativeDriver: false,
            }),
            Animated.timing(size, {
                toValue: 0.1,
                duration: 1000,
                useNativeDriver: false,
            }),
        ]).start(() =>  handleFavorite(item));
    };

    const handleFavorite=(item) =>{
        removeFromList(item.id)
        favorite ? deleteCharacterData(item):writeCharacterData(item)
    }

    return (
        <Animated.View style={[
            styles.characters,
            {
                transform: [{ translateX: value }, { scale: size }],
            },
        ]}>
            <TouchableOpacity onPress={() => {dispatch(setModalItem(item)),dispatch(setModalCharacterVisible(true))}}>
              <Image style={styles.image} source={{uri: item.image}} />
            </TouchableOpacity>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => {animateCard();}}>
            <Image source = { favorite ?  require('../../assets/unfav.png') : require('../../assets/favoritoVacio.png')} style={styles.favorito}></Image>
            </TouchableOpacity>
          </Animated.View>
    )
};
const styles = StyleSheet.create({

    name: {
        textAlign:'center',
        textAlignVertical:'center',
        fontSize: 15,
        fontWeight: 'bold',
        top:5,
        height:40
      },
      favorito: {
        width:20,
        height:20,
        backgroundColor:'blue',
        borderRadius:30,
      },
      favUbication: {
        backgroundColor: '#e0fbfc',
      },
      characters: {
        flex: 1,
        backgroundColor: '#e0fbfc',
        alignItems: 'center',
        justifyContent:'center',
      },
      image: {
        alignContent:'center',
        justifyContent:'center',
        width: 100,
        height: 100,
        top: "8%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor:"red"
      },
});