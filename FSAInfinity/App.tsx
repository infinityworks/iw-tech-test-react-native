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

import { getLocalAuthorities } from './apis';
import { LocalAuthority } from './models';
import { LocalAuthorityList } from './components/local-authority-list';

function App(): ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  const [localAuthorities, setLocalAuthorities] = useState<
    readonly LocalAuthority[] | null
  >();

  const [errorMessage, setErrorMessage] = useState<String | null>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    async function fetchLocalAuthorities() {
      try {
        let authorities = await getLocalAuthorities();

        setLocalAuthorities(authorities);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    }

    fetchLocalAuthorities();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!localAuthorities && <ActivityIndicator />}

      {localAuthorities && (
        <LocalAuthorityList localAuthorities={localAuthorities} />
      )}

      {errorMessage && <Text>{errorMessage}</Text>}
    </SafeAreaView>
  );
}

export default App;
