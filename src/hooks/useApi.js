import app from '../dbConnection'
import {ref,getDatabase,get,remove,set} from "firebase/database";
import { useSelector ,useDispatch} from 'react-redux';
import { setFavs, setData} from '../store/Reducers';

export function useApi() {
    const db = getDatabase(app);
    const dispatch = useDispatch(); 
    const { favs,data }  = useSelector(state => state.application);
    const getCharactersFromFavs = () => {
        const aux = []
          get(ref(db,'Favoritos')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((groupSnapshot) => {aux.push(JSON.parse(JSON.stringify(groupSnapshot)))}) //limpia lo recibido de la bd para convertirlo en json
                dispatch(setFavs(aux))
            } else {
                console.log("No data available");
                dispatch(setFavs())
            }
            }).catch((error) => {
                console.error(error);
            });     
        };

    const getCharactersFromApi = () => {
         fetch('https://rickandmortyapi.com/api/character')
            .then((response) => response.json())
            .then((json) => {
                dispatch(setData(json))
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    const getNextCharacters = () => {
        return fetch(data.info.next)
            .then((response) => response.json())
            .then((json) => {
                let newData = json;
                newData.results = [...data.results, ...newData.results]
                dispatch(setData(newData))
            })
            .catch((error) => {
                if (data.info.next != null){
                    console.log('error'+error);
                }
            })
    }

    const getFilteredCharacters = (genderFilter,statusFilter,lastFilter,text) => {
        return fetch('https://rickandmortyapi.com/api/character/?gender='+genderFilter+"&status="+statusFilter+"&"+lastFilter.toLowerCase()+"="+text)
        .then(response => response.json())
            .then((json) => {
                dispatch(setData(json))
            })
            .catch((error) => {
                dispatch(setData({results: null}));
            })
    }

    const writeCharacterData=(item) => (
        set(ref(db, 'Favoritos/'+item.id), {
          id : item.id,
          name: item.name,
          image : item.image,
          species: item.species,
          type : item.type,
          gender: item.gender,
        })
        .then(()=>{console.log("se agrego correctamente " + item.name+' a favoritos')})
        .catch((error)=>{console.log("hay un error")})
    )

    const writeCharacterComment=(item,text) => (
        set(ref(db, 'Favoritos/'+item.id), {
          id:item.id,
          name: item.name,
          image : item.image,
          species: item.species,
          type : item.type,
          gender: item.gender,
          comment: text
        })
        .then(()=>{console.log("se agrego correctamente el comentario a " + item.name)})
        .catch((error)=>{console.log("hay un error")})
    )

    const deleteCharacterComment=(item) => (
        set(ref(db, 'Favoritos/'+item.id), {
          id:item.id,
          name: item.name,
          image : item.image,
          species: item.species,
          type : item.type,
          gender: item.gender,
        })
        .then(()=>{console.log("se elimino correctamente el comentario a " + item.name)})
        .catch((error)=>{console.log("hay un error")})
    )
    const deleteCharacterData=(item) => (
      remove(ref(db, 'Favoritos/' + item.id))
      .then(()=>{console.log("se elimino correctamente " + item.name + ' de favoritos')})
      .catch((error)=>{console.log("hay un error")})
  )

    return { data,favs,getCharactersFromApi, getNextCharacters, getFilteredCharacters, deleteCharacterData,writeCharacterData,writeCharacterComment,getCharactersFromFavs,deleteCharacterComment };
}