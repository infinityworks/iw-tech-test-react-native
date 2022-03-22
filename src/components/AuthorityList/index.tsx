import React, { ReactElement } from 'react';

import { FlatList, ListRenderItem, Text, TouchableWithoutFeedback } from 'react-native';

import { Authority } from 'src/models';

type AuthorityListProps = {
    readonly authorities: readonly Authority[];
    onSelectAuthority?(authority: Authority): void;
};

function AuthorityList({
    authorities,
    onSelectAuthority = undefined,
}: AuthorityListProps): ReactElement {
    if (authorities.length === 0) {
        return <Text>No authorities found.</Text>;
    }

    let renderItem: ListRenderItem<Authority> = ({ item: authority }) => {
        let { id, name } = authority;

        return (
            <TouchableWithoutFeedback onPress={() => onSelectAuthority?.(authority)}>
                <Text key={id}>{name}</Text>
            </TouchableWithoutFeedback>
        );
    };

    return <FlatList data={authorities} renderItem={renderItem} />;
}

export { AuthorityList };
