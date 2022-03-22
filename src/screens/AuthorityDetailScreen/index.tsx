import React, { ReactElement } from 'react';

import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { AuthorityDetailRouteProp } from 'src/navigation';

function AuthorityDetailScreen(): ReactElement {
    const route = useRoute<AuthorityDetailRouteProp>();

    const { name } = route.params.authority;

    return <Text>{name}</Text>;
}

export { AuthorityDetailScreen };
