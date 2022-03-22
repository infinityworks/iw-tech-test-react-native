import React, { ReactElement } from 'react';

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthorityDetailScreen, AuthorityListScreen } from 'src/screens';
import { RootStackParamList } from 'src/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): ReactElement {
    return (
        <NavigationContainer>
            <StatusBar />
            <Stack.Navigator>
                <Stack.Screen name="AuthorityList" component={AuthorityListScreen} />
                <Stack.Screen name="AuthorityDetail" component={AuthorityDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
