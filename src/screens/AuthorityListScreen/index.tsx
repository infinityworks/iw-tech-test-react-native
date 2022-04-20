import React, { ReactElement, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, Text } from 'react-native';

import { getAuthorities } from 'src/api';
import { AuthorityList } from 'src/components';
import { Authority } from 'src/models';
import { RootStackNavigation } from 'src/navigation';

const AuthorityListScreen = (): ReactElement => {
    const [authorities, setAuthorities] = useState<readonly Authority[]>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const navigation = useNavigation<RootStackNavigation>();

    useEffect(() => {
        const getAuthoritiesAsync = async () => {
            try {
                setAuthorities(await getAuthorities());
            } catch (error) {
                setErrorMessage((error as Error).message);
            }
        };

        getAuthoritiesAsync();
    }, []);

    const onSelectAuthority = (authority: Authority) => {
        navigation.navigate('AuthorityDetail', { authority });
    };

    if (errorMessage) {
        return <Text>{errorMessage}</Text>;
    }

    if (!authorities) {
        return <ActivityIndicator testID="activity-indicator" />;
    }

    return <AuthorityList authorities={authorities} onSelectAuthority={onSelectAuthority} />;
};

export default AuthorityListScreen;
