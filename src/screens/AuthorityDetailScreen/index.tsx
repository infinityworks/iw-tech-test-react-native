import React, { ReactElement, useLayoutEffect } from 'react';

import { Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AuthorityDetailRoute, RootStackNavigation } from 'src/navigation';

function AuthorityDetailScreen(): ReactElement {
    const route = useRoute<AuthorityDetailRoute>();
    const navigation = useNavigation<RootStackNavigation>();

    const { name } = route.params.authority;

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
    });

    return <Text>{name}</Text>;
}

export { AuthorityDetailScreen };
