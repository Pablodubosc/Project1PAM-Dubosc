import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import CharacterInfo from "../components/CharacterInfo";
import ListOfCharacters from '../components/ListOfCharacters';
import Topbar from '../components/Topbar';
import MenuBar from '../components/MenuBar';
import { useApi } from '../hooks/useApi';
import { useSelector } from 'react-redux';

const Menu = ({navigation}) => {

  const {data,modalItem, modalCharacterVisible}  = useSelector(state => state.application);
  const { getCharactersFromApi, getNextCharacters, getFilteredCharacters} = useApi();

  useEffect(() => {
    getCharactersFromApi();
  }, [])
  
  return (
    
    <View style={styles.container}>     
      <Topbar getCharacters = {getFilteredCharacters}></Topbar>
       {data && (<ListOfCharacters data={data.results} favorites={false} getNext={getNextCharacters} /*setModalVisible={setModalVisible}*/></ListOfCharacters> )}     
      <View>
        <Modal animationType="slide" transparent={false} visible={modalCharacterVisible}>
          <CharacterInfo item={modalItem} favorite={false}/>
        </Modal>
      </View>
      <MenuBar navigation = {navigation}></MenuBar>
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
  buttonHome: {
    backgroundColor: 'grey',
    width:75,
    top:110
  },
});
