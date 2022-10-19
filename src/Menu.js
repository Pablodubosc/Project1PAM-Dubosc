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
  }
});
