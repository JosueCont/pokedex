import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListPokemon from '../components/ListPokemon';
import {Context as PokemonContext} from '../context/pokemonsApi';


const Index = ({navigation}) => {
  const useData = () => {
    return !!state.data.results && state.data.results.filter(pokemon=>{
      return  pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
     })     
  }
  useEffect(() => {
    fecthData();
  }, []);
  const {state, fecthData} = useContext(PokemonContext);
  const [searchPokemon, setSearchPokemon] = useState('');
  console.log('losDAtos', state.data.results);
  console.log('buscar',searchPokemon);
  return (
    <View style={styles.screen}>
      <View style={styles.position}>
        <TextInput
          placeholder="Buscar pokemon"
          style={styles.input}
          value={searchPokemon}
          onChangeText={e => setSearchPokemon(e)}
        />
        <Icon name="search" size={20} color="#000" style={styles.icon} />
      </View>
       <FlatList
          contentContainerStyle={styles.container}
          numColumns={2}
          data={useData()}
          renderItem={({item,key}) => (
            <ListPokemon
              key={key}
              item={item}
              navigator={() => navigation.navigate('Detalles', {item})}
            />
          )}
          keyExtractor={item => item.name}
        />
     
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 10,
  },
  position: {
    position: 'relative',
  },
  input: {
    width: 360,
    height: 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 30,
  },
  container: {
    flexDirection: 'column',    
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default Index;
