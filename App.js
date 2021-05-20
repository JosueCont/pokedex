import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Index from './src/screens/Index';
import Details from './src/screens/Details';
import {Provider as PokemonProvider} from './src/context/pokemonsApi';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <PokemonProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Index"
              component={Index}
              options={{headerShown: false}}
            />
             <Stack.Screen
              name="Detalles"
              component={Details}
              options={{
                headerStyle: {
                  backgroundColor: 'blue',
                },
                headerTitleStyle: {
                  color: 'white',
                },
                headerTintColor: 'white'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PokemonProvider>
    );
  }
}
