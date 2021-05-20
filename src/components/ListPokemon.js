import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const ListPokemon = ({item, navigator}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={navigator}>
      <Image
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
        }}
        alt="Imagen pokemon"
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 170,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
  num: {
    color: 'green',
    fontSize: 15,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default ListPokemon;
