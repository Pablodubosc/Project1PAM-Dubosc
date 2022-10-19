import React, {useState,  useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal
} from 'react-native';

import CharacterInfo from "./components/CharacterInfo";
import ListOfCharacters from './components/ListOfCharacters';
import Topbar from './components/Topbar';


const Menu = () => {
  const [data_filtrada,setDataFiltrada]=useState([]);
  const [modalItem, setModalItem] = useState("");
  const [modalVisible, setModalVisible] = useState("false");
  

  const closeModal = () => {
    setModalVisible(false);}

  const getCharacters=async(genderFilter,statusFilter,lastFilter,text)=> {
    const data= await fetch('https://rickandmortyapi.com/api/character/?gender='+genderFilter+"&status="+statusFilter+"&"+lastFilter.toLowerCase()+"="+text).then(response => response.json());
    setDataFiltrada(data.results);
    console.log(data_filtrada);
}
const getCharactersFromApi = async() => {
  const data=  await fetch('https://rickandmortyapi.com/api/character/?').then(response => response.json());
  setDataFiltrada(data.results);
  console.log(data_filtrada);
}

useEffect(() => {
  getCharactersFromApi();
}, [])
  
  return (
    <View style={styles.container}>      
      <Topbar getCharacters = {getCharacters}></Topbar>
      
       <ListOfCharacters data={data_filtrada} setModalItem={setModalItem} setModalVisible={setModalVisible}></ListOfCharacters>

      <View>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <CharacterInfo item={modalItem} handleClose = {closeModal} />
        </Modal>
      </View>
    </View>  
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0fbfc',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pickerCont:{
    alignContent:'center',
    justifyContent:'center',
    alignSelf:'center',
    top:50
  },
  name: {
    textAlign:'center',
    textAlignVertical:'center',
    fontSize: 15,
    fontWeight: 'bold',
    top:5,
    height:40
  },
  info: {
    backgroundColor:"#90e0ef",
    borderRadius:25,
    height:20,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    width: '50%',
    textAlign:'center',
    textAlignVertical:'center',
    alignSelf:'center',
  },
  characters: {
    flex: 1,
    backgroundColor: '#e0fbfc',
    alignItems: 'center',
    justifyContent:'center',
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: 'grey',
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
  }
});
