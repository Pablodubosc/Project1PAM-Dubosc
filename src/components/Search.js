import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Modal
  } from "react-native";
import Dropdown from "./Dropdown";

export default function Search({closeSearch,getCharacters}) {
    const [text, onChangeText] = useState("");
    const [lastFilter, setLastFilter] = useState('name');
    const [genderFilter, setGenderFilter] = useState('none');
    const [statusFilter, setStatusFilter] = useState('none');

    const filterChracters= (genderFilter,statusFilter,lastFilter,text) => {
      getCharacters(genderFilter == 'none' ? '' : genderFilter,statusFilter == 'none' ? '' : statusFilter,lastFilter,text)
    }
   return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Add filters to search Rick & Morty characters!</Text>

            
            <Text style={styles.genderText}>Filter by gender:</Text>
            <Dropdown style = {styles.genderFilter} options = {['none','male', 'female', 'unknown', 'genderless']} filterOptions = {genderFilter} setOptions = {setGenderFilter} />

            <Text style={styles.statusText}>Filter by status:</Text>
            <Dropdown style = {styles.statusFilter} options = {['none','alive', 'dead', 'unknown']} filterOptions = {statusFilter} setOptions = {setStatusFilter} />
            
            <Text style={styles.lastFilterText}>Add one last filter:</Text>
            <Dropdown style = {styles.lastFilter} options = {['name', 'species', 'type']} filterOptions = {lastFilter} setOptions = {setLastFilter} />
            
            <View style={styles.inputView}>
              <TextInput placeholder="keyword..." style={styles.inputText} placeholderTextColor="white" onChangeText={(text) => {onChangeText(text)}} value={text}></TextInput>
            </View>
        
            <TouchableOpacity style={styles.search} onPress={() => {closeSearch(); filterChracters(genderFilter,statusFilter,lastFilter,text)}}>
              <Text style={styles.searchText}>Search</Text>
              <Image style={styles.sumbitImage} source = {require('../../assets/lupa.png')} />
            </TouchableOpacity>
        </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0fbfc',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titulo:{
    top:60,
      fontSize:17,
      fontWeight:"900"
  },

  genderText:{
    top:80,
    fontSize:15,
    fontWeight:"900",
  },
  genderFilter: {
    width: '30%',
    alignSelf: 'center',
    top:92,
    zIndex: 2,
    elevation: 2,
  },

  statusText:{
    top:112,
    fontSize:15,
    fontWeight:"900",
  },

  statusFilter: {
    width: '30%',
    alignSelf: 'center',
    top:122,
    zIndex: 1,
    elevation: 1,
  },

  lastFilterText:{
    top:140,
    fontSize:15,
    fontWeight:"900",
    zIndex: -1,
    elevation: -1,
  },

  lastFilter: {
    width: '30%',
    alignSelf: 'center',
    top:145
  },
  inputView:{
    width:"45%",
    tintColor:"#0096c7",
    backgroundColor:"#0096c7",
    borderRadius:25,
    height:30,
    justifyContent:"center",
    top:152,
    zIndex:-1,
    borderColor:"black",
    borderWidth:1,
  },
  inputText:{
    height:40,
    fontSize:15,
    color:"white",
    textAlign:'center',
    textAlignVertical:'center',
  },
  search:{
    top:200,
    width:150,
    backgroundColor:"#90e0ef",
    borderRadius:25,
    borderColor:"black",
    borderWidth:2,
    height:50,
    fontSize: 20,
  },

  searchText:{
    fontWeight: 'bold',
    textAlign:'center',
    textAlignVertical:'center',
    top:10,
    fontSize: 20,
    right:15
  },
  sumbitImage:{
    width:35,
    backgroundColor:"#0096c7",
    borderRadius:20,
    borderWidth:1,
    borderColor:"black",
    height:35,
    color:'white',
    textAlign:'center',
    textAlignVertical:'center',
    left:100,
    top:-22
},
});