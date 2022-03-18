import React, { ReactElement } from 'react';
import { FlatList, ListRenderItem, Text } from 'react-native';

import { Authority } from 'src/models';

type AuthorityListProps = {
    readonly authorities: readonly Authority[];
};

function AuthorityList({ authorities }: AuthorityListProps): ReactElement {
    if (authorities.length === 0) {
        return <Text>No authorities found.</Text>;
    }

    let renderItem: ListRenderItem<Authority> = ({ item }) => {
        let { id, name } = item;

        return <Text key={id}>{name}</Text>;
    };

    return <FlatList data={authorities} renderItem={renderItem} />;
}

export { AuthorityList };
