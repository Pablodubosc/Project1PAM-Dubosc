import app from '../dbConnection'
import {ref,getDatabase,get,remove,set} from "firebase/database";
import { useSelector ,useDispatch} from 'react-redux';
import { setData, setFavs} from '../store/Reducers';

export function useApi() {
    const db = getDatabase(app);
    const dispatch = useDispatch(); 
    const {favs,data }  = useSelector(state => state.application);
   

    const getFavsFromDB = async () => {
        const aux = [];
        
        try {
          const snapshot = await get(ref(db, 'Favoritos'));
      
          if (snapshot.exists()) {
            snapshot.forEach((groupSnapshot) => {
              aux.push(JSON.parse(JSON.stringify(groupSnapshot)));
            });
            return aux;
          } else {
            console.log("No data available");
            return aux;
          }
        } catch (error) {
          console.error(error);
          return aux;
        }
      };
      
      const getCharactersFromApi = async () => {
        try {
          const aux = await getFavsFromDB();
      
          const response = await fetch('https://rickandmortyapi.com/api/character');
          const json = await response.json();
      
          const withOutFavJson = {
            ...json,
            results: json.results.filter((character) => !aux.some((fav) => fav.id === character.id)),
          };
      
          dispatch(setData(withOutFavJson));
        } catch (error) {
          console.log(error);
        }
      };
    
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
                const withOutFavJson = {
                    ...json,
                    results: json.results.filter((character) => { return !favs.some((fav) => fav.id === character.id)})
                  };
                dispatch(setData(withOutFavJson))
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
        .then(()=>{const updatedFavs = [...favs, item];
            dispatch(setFavs(updatedFavs));
            console.log("se agrego correctamente " + item.name+' a favoritos')})
        .catch((error)=>{console.log("hay un error"),console.log(error)})
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
        .catch((error)=>{console.log("hay un error",error)})
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
      .then(()=>{console.log("se elimino correctamente " + item.name + ' de favoritos'),
      dispatch(setFavs(favs.filter((fav) => fav.id !== item.id)))})
      .catch((error)=>{console.log("hay un error")})
  )

    return { data,favs,getCharactersFromApi, getNextCharacters, getFilteredCharacters, deleteCharacterData,writeCharacterData,writeCharacterComment,getFavsFromDB,deleteCharacterComment };
}