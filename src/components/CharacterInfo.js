
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";

export default function CharacterInfo({item,handleClose}) {
 return (
        <View style={styles.modal} >
            <Text style={styles.modalText}>{item.name}</Text>
            <TouchableOpacity style={styles.modalHide} onPress={ handleClose}>
              <Text style={styles.modalX}>X</Text>
            </TouchableOpacity>
            <Image style={styles.image} source={{uri: item.image}} />
            <Text style={styles.modalText}>Status: {item.status}</Text>
            <Text style={styles.modalText}>Species: {item.species}</Text>
            <Text style={styles.modalText}>Type: {item.type}</Text>
            <Text style={styles.modalText}>Gender: {item.gender}</Text>        
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
    top: "5%"
  },

  modalHide:{
    width:"10%",
    backgroundColor:"#90e0ef",
    borderRadius:25,
    height:30,
    left:120,
    top:50,
    zIndex:1,

  },
  modalX:{ 
    textAlign:'center',
    textAlignVertical:"center",
    fontSize: 20,
    fontWeight: 'bold',
    borderColor:"red",
    borderWidth:3,
    borderRadius:20,
    color:"red"
  },

  image: {
    alignContent:'center',
    justifyContent:'center',
    width: 300,
    height: 330,
    top: "2%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor:"red"
  }
});