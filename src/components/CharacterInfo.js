import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { useApi } from '../hooks/useApi';
import { setModalCharacterVisible } from '../store/Reducers';
import { useDispatch, useSelector } from 'react-redux';

export default function CharacterInfo({item,favorite}) {
  const dispatch = useDispatch();  
  const { writeCharacterComment,deleteCharacterComment} = useApi();
  const [text, onChangeText] = useState("");
  const[comment,setComment] = useState(item.comment);
 return (
        <View style={styles.modal} >
            <Text style={styles.modalText}>{item.name}</Text>
            <TouchableOpacity style={styles.modalHide} onPress={() => {dispatch(setModalCharacterVisible(false))}}>
              <Text style={styles.modalX}>X</Text>
            </TouchableOpacity>
            <Image style={styles.image} source={{uri: item.image}} />
            <Text style={styles.modalText}>Status: {item.status}</Text>
            <Text style={styles.modalText}>Species: {item.species}</Text>
            <Text style={styles.modalText}>Type: {item.type}</Text>
            <Text style={styles.modalText}>Gender: {item.gender}</Text>
            {comment && favorite && (
            <View style={styles.addCommentContainer}>
              <Text style={styles.comment}>{item.comment ? item.comment : text}</Text>
              <TouchableOpacity style={styles.addComment} onPress={() => {deleteCharacterComment(item,text),setComment(false)}}>
                <Text style={{fontSize:15, fontWeight:'bold',textAlign:'center'}}>Del </Text>
            </TouchableOpacity>
            </View>)} 
            {favorite && !comment && (
            <View style={styles.addCommentContainer}>
              <TextInput style={styles.comment} placeholder="Add a comment" maxLength={20} onChangeText={(text) => {onChangeText(text)}}></TextInput>
              <TouchableOpacity style={styles.addComment} onPress={() => {writeCharacterComment(item,text),setComment(true)}}>
                <Text style={{fontSize:15, fontWeight:'bold',textAlign:'center'}}>Add </Text>
            </TouchableOpacity>
            </View>)}           
        </View>
)}

const styles = StyleSheet.create({
modal: {
    flex: 1,
    backgroundColor: '#e0fbfc',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  modalText:{
    textAlign:'center',
    textAlignVertical:'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 7,
    top: "1.5%"
  },
  addCommentContainer:{
    borderWidth:2,
    borderRadius:20,
    borderColor:'grey',
    width:300,
    height:30,
    top:25
  },
  addComment:{
    left:130,
    borderWidth:1,
    borderRadius:20,
    width:35,
    top:15,
  },
  comment:{
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  favUbication: {
    backgroundColor: '#e0fbfc',
    top:10,
    width:10,
    borderRadius:20,
    zIndex:1,
    right:10,
  },
  modalHide:{
    width:"7%",
    backgroundColor:"#90e0ef",
    borderRadius:23,
    height:24,
    top:5,
    zIndex:1,

  },
  modalX:{ 
    textAlign:'center',
    textAlignVertical:"center",
    fontSize: 15,
    fontWeight: 'bold',
    borderColor:"red",
    borderWidth:2,
    borderRadius:20,
    color:"red"
  },

  image: {
    alignContent:'center',
    justifyContent:'center',
    width: 280,
    height: 280,
    top: "2%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor:"red"
  }
});