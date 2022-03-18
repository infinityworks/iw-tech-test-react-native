/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { ReactElement, useEffect, useState } from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { getAuthorities } from '../../apis';
import { Authority } from '../../models';
import { AuthorityList } from '../../components';

function App(): ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  const [authorities, setAuthorities] = useState<readonly Authority[] | null>();

  const [errorMessage, setErrorMessage] = useState<String | null>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    async function getAuthoritiesAsync() {
      try {
        let newAuthorities = await getAuthorities();

        setAuthorities(newAuthorities);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    }

    getAuthoritiesAsync();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {!authorities && <ActivityIndicator />}

      {authorities && <AuthorityList authorities={authorities} />}

      {errorMessage && <Text>{errorMessage}</Text>}
    </SafeAreaView>
  );
}

export default App;
