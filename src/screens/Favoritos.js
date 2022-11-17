import React, {useEffect} from 'react';
import ListOfCharacters from '../components/ListOfCharacters';
import CharacterInfo from "../components/CharacterInfo";
import {
    View,
    StyleSheet,
    Modal,
    Text,
} from 'react-native';
import { useApi } from '../hooks/useApi';
import MenuBar from '../components/MenuBar';
import { useSelector } from 'react-redux';

const Favoritos = ({navigation}) => {
    const {modalItem, modalCharacterVisible, favs }  = useSelector(state => state.application);
    const { getCharactersFromFavs } = useApi();
    useEffect(() => {
        getCharactersFromFavs();
      }, [modalCharacterVisible])
    return (
        <View style={styles.container}>
          <Text style={styles.titulo}>YOUR FAVORITES CHARACTERS</Text>
          <View style={styles.border}/>
          <ListOfCharacters data={favs} favorites={true}  ></ListOfCharacters>
          <View>
            <Modal animationType="slide" transparent={false} visible={modalCharacterVisible}>
                <CharacterInfo item={modalItem} favorite={true} />
            </Modal>
          </View>
          <MenuBar navigation = {navigation}></MenuBar>
        </View>
    );
}
export default Favoritos;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0fbfc',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
    buttonHome: {
      backgroundColor: 'grey',
      width:40,
      top:140
    },
    titulo:{
      top:27,
      fontSize:14,
      fontWeight:"900",
      padding:17
  },
  border:{
    borderBottomColor: 'black',
    width:400,
    borderWidth:1,
    borderRadius:40,
    top:27,}
  });
