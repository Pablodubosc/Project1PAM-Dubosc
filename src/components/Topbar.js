import {View, TouchableOpacity, Image,  StyleSheet,Text,Modal } from 'react-native';
import { setSearchModalVisible } from '../store/Reducers';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Search from './Search';

const Topbar = ({getCharacters})=>  {
   const dispatch = useDispatch();
   const {searchModalVisible}  = useSelector(state => state.application);

    return (
        <View>
            <TouchableOpacity onPress={() => {dispatch(setSearchModalVisible(true))}}>
                <Text style={styles.titulo}>SEARCH RICK & MORTY CHARACTERS</Text>
                <Image style={styles.sumbitImage} source = {require('../../assets/lupa.png')} />
                <View style={styles.border}/>
                <Modal animationType="slide" transparent={false} visible={searchModalVisible}>
                    <Search getCharacters={getCharacters}/>
                </Modal>
            </TouchableOpacity>                      
        </View>
    )
}
export default Topbar;
const styles = StyleSheet.create({
    sumbitImage:{
        width:35,
        backgroundColor:"#0096c7",
        borderRadius:20,
        borderWidth:1,
        borderColor:"black",
        height:35,
        color:'white',
        fontSize:17,
        top: 15,
        left:310
  },
    titulo:{
        top:40,
        fontSize:14,
        fontWeight:"900",
        left:50
  },
  border:{
    borderBottomColor: 'black',
    width:400,
    borderWidth:1,
    borderRadius:40,
    top:25}
});