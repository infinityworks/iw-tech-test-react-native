import React, { ReactElement } from 'react';

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthorityListScreen } from 'src/screens/AuthorityListScreen';

const Stack = createNativeStackNavigator();

function App(): ReactElement {
    return (
        <NavigationContainer>
            <StatusBar />
            <Stack.Navigator>
                <Stack.Screen name="Authorities" component={AuthorityListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
