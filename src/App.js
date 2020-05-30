import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Home} from './Home'
import {Sentence} from './Sentence'
import {CountContextProvider} from './CountContext'

const Stack = createStackNavigator()

const App = () => {
  return (
    <CountContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen
            name="Home"
            options={{title: '96 문장 듣고 반복하기'}}
            component={Home}
          />
          <Stack.Screen
            name="Sentence"
            component={Sentence}
            options={({route}) => ({title: '문장: ' + route.params.no})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CountContextProvider>
  )
}

export default App
