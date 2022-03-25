import React, { ReactElement, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, Text, View } from 'react-native';

import { getAuthorities } from 'src/api';
import { AuthorityList } from 'src/components';
import { Authority } from 'src/models';
import { RootStackNavigation } from 'src/navigation';

function AuthorityListScreen(): ReactElement {
    const [authorities, setAuthorities] = useState<readonly Authority[]>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const navigation = useNavigation<RootStackNavigation>();

    useEffect(() => {
        async function getAuthoritiesAsync() {
            try {
                setAuthorities(await getAuthorities());
            } catch (error) {
                setErrorMessage((error as Error).message);
            }
        }

        getAuthoritiesAsync();
    }, []);

    const onSelectAuthority = (authority: Authority) => {
        navigation.navigate('AuthorityDetail', { authority });
    };

    return (
        <View>
            {!authorities && <ActivityIndicator testID="activity-indicator" />}
            {authorities && (
                <AuthorityList authorities={authorities} onSelectAuthority={onSelectAuthority} />
            )}
            {errorMessage && <Text>{errorMessage}</Text>}
        </View>
    );
}

export { AuthorityListScreen };
