import React, { ReactElement, useEffect, useState } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';

import { getAuthorities } from 'src/api';
import { AuthorityList } from 'src/components';
import { Authority } from 'src/models';

function AuthorityListScreen(): ReactElement {
    const [authorities, setAuthorities] = useState<readonly Authority[] | null>();
    const [errorMessage, setErrorMessage] = useState<String | null>();

    useEffect(() => {
        async function getAuthoritiesAsync() {
            try {
                let newAuthorities = await getAuthorities();

                setAuthorities(newAuthorities);
            } catch (error) {
                console.log((error as Error).message);
                setErrorMessage((error as Error).message);
            }
        }

        getAuthoritiesAsync();
    }, []);

    return (
        <View>
            {!authorities && <ActivityIndicator testID="activity-indicator" />}
            {authorities && <AuthorityList authorities={authorities} />}
            {errorMessage && <Text>{errorMessage}</Text>}
        </View>
    );
}

export { AuthorityListScreen };
