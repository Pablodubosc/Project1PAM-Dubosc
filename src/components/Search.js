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
import { setSearchModalVisible,resetFilters} from '../store/Reducers';
import { useDispatch, useSelector } from 'react-redux';

export default function Search({getCharacters}) {
    const [text, onChangeText] = useState("");

    const {lastFilter,genderFilter,statusFilter,lastFilterOptions,genderFilterOptions,statusFilterOptions}  = useSelector(state => state.application);
    const dispatch = useDispatch();

    const filterChracters= () => {
      getCharacters(genderFilter == 'no gender' ? '' : genderFilter,statusFilter == 'no status' ? '' : statusFilter,lastFilter,text)
    }
   return (
        <View style={styles.container}>
          <View style={styles.borderTop}/>
            <Text style={styles.titulo}>Add filters to search Rick & Morty characters!</Text>
            <Text style={styles.genderText}>Filter by gender:</Text>
            <Dropdown style = {styles.genderFilter} options = {genderFilterOptions} filterOptions = {genderFilter} />

            <Text style={styles.statusText}>Filter by status:</Text>
            <Dropdown style = {styles.statusFilter} options = {statusFilterOptions} filterOptions = {statusFilter}  />
            
            <Text style={styles.lastFilterText}>Add one last filter:</Text>
            <Dropdown style = {styles.lastFilter} options = {lastFilterOptions} filterOptions = {lastFilter} />
            
            <View style={styles.inputView}>
              <TextInput placeholder="keyword..." style={styles.inputText} placeholderTextColor="white" onChangeText={(text) => {onChangeText(text)}} value={text}></TextInput>
            </View>
            <View style={styles.borderBottom}/>
            <TouchableOpacity style={styles.search} onPress={() => {dispatch(setSearchModalVisible(false)), filterChracters()}}>
              <Text style={styles.searchText}>SEARCH</Text>
              <Image style={styles.sumbitImage} source = {require('../../assets/lupa.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetFilters} onPress={() => {dispatch(resetFilters())}}>
              <Text style={styles.resetFiltersText}>reset filters</Text>
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
    top:105,
      fontSize:18,
      fontWeight:"900"
  },

  genderText:{
    top:160,
    right:90,
    fontSize:18,
    fontWeight:"900",
  },
  genderFilter: {
    width: '30%',
    alignSelf: 'center',
    top:135,
    left:60,
    zIndex: 2,
    elevation: 2,
  },

  statusText:{
    top:177,
    right:92,
    fontSize:18,
    fontWeight:"900",
  },

  statusFilter: {
    width: '30%',
    alignSelf: 'center',
    top:155,
    left:60,
    zIndex: 1,
    elevation: 1,
  },

  lastFilterText:{
    top:195,
    fontSize:18,
    fontWeight:"900",
    zIndex: -1,
    elevation: -1,
  },

  lastFilter: {
    width: '30%',
    alignSelf: 'center',
    top:210,
    right:100,
  },
  inputView:{
    width:"45%",
    tintColor:"#0096c7",
    backgroundColor:"#0096c7",
    borderRadius:25,
    height:30,
    justifyContent:"center",
    top:180,
    left:70,
    zIndex:-1,
    borderColor:"black",
    borderWidth:2,
  },
  inputText:{
    height:40,
    fontSize:15,
    color:"white",
    textAlign:'center',
    textAlignVertical:'center',
  },
  search:{
    top:225,
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

  resetFilters:{
    top:235,
    width:100,
    backgroundColor:"#90e0ef",
    borderRadius:25,
    borderColor:"black",
    borderWidth:2,
    height:25,
    fontSize: 20,
  },

  resetFiltersText:{
    fontWeight: 'bold',
    textAlign:'center',
    textAlignVertical:'center',
    fontSize: 15,
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
borderTop:{
  borderBottomColor: 'black',
  width:370,
  borderWidth:1,
  borderRadius:40,
  top:150},

  borderBottom:{
    borderBottomColor: 'black',
    width:370,
    borderWidth:1,
    borderRadius:40,
    top:210}
});