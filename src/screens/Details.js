import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Context as PokemonContext} from '../context/pokemonsApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Moves} from '../components/modalMoves';

const types = pokemon => {
  return (
    !!pokemon &&
    pokemon.map((tipo, key) => {
      return (
        <View style={{flexDirection: 'row'}} key={key}>
          <Icon
            name="question-circle"
            size={20}
            color="black"
            style={{paddingTop: 5, marginRight: 5}}
          />
          <Text style={styles.tipos}>{tipo.type.name}</Text>
        </View>
      );
    })
  );
};

const abilities = pokemon => {
  return (
    !!pokemon &&
    pokemon.map((ability, key) => {
      return (
        <View style={{flexDirection: 'row'}} key={key}>
          <Icon
            name="check-circle"
            size={20}
            color="black"
            style={{paddingTop: 5, marginRight: 5}}
          />
          <Text style={styles.tipos}>{ability.ability.name}</Text>
        </View>
      );
    })
  );
};

const evoluciona = item => {
  return (
    item.chain &&
    !!item.chain.evolves_to &&
    item.chain.evolves_to.map((evol,key) => {
      return (
        <>
          <View style={styles.itemEvol} key={key}>
            <Text>{evol.species.name}</Text>
            <Image
              source={{
                uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${evol.species.name}.png`,
              }}
              style={styles.imgEvol}
            />
          </View>
          {evol
            ? evol.evolves_to.map((data,key) => {
                return(
                  <View style={styles.itemEvol} key={key}>
                    <Text>{data.species.name}</Text>
                    <Image 
                     source={{
                       uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${data.species.name}.png`
                     }}
                     style={styles.imgEvol}
                    />
                  </View> 
                );
              })
            : <Text>No tiene evoluciones</Text>}
        </>
      );
    })
  );
};

const Details = ({route}) => {
  const {item} = route.params;
  const {state, Details, fetchEvolution} = useContext(PokemonContext);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    Details(item.name);
    fetchEvolution(state.detail.id);
  }, [state.detail]);
  return (
    <View style={styles.container}>
      {state.loading === true ? (
        <>
          <Image
            source={{
              uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
            }}
            style={styles.image}
          />
          <Text style={styles.name}>{item.name}</Text>
          <ScrollView>
            <View style={styles.contTipos}>
              <Text style={styles.tipos}>Tipos:</Text>
              {types(state.detail.types)}
            </View>
            <Text style={styles.height}>Tamaño: {state.detail.height} cm</Text>
            <Text style={styles.height}>Peso: {state.detail.weight} kg</Text>
            <View style={styles.contTipos}>
              <Text style={styles.tipos}>Habilidades:</Text>
              {abilities(state.detail.abilities)}
            </View>
            <TouchableOpacity
              style={styles.btnMov}
              onPress={() => setModal(!modal)}>
              <Text style={styles.lblBtn}>Ver movimientos</Text>
            </TouchableOpacity>
            <Moves
              visible={modal}
              onClose={() => setModal(false)}
              data={state.detail}
            />
            <Text style={styles.lblEvolution}>Evoluciones</Text>
            <View style={styles.contEvol}>{ evoluciona(state.evolution)}</View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#E63F34" />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  contTipos: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: 15,
    marginBottom: 10,
    paddingRight: 10,
  },
  tipos: {
    fontSize: 20,
    marginRight: 10,
  },
  height: {
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 10,
  },
  name: {
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: 10,
  },
  btnMov: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  lblBtn: {
    fontSize: 15,
    color: 'white',
  },
  lblEvolution: {
    fontSize: 20,
    alignSelf: 'center',
  },
  contEvol: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemEvol:{
    flexDirection: 'column',
    alignItems: 'center'
  },
  imgEvol:{
    width:100,
    height:100
  }
});

export default Details;
