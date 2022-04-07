import React, { ReactElement } from 'react';

import { FlatList, ListRenderItem, Text, TouchableWithoutFeedback, View } from 'react-native';

import { Authority } from 'src/models';

import { styles } from './index.styles';

type AuthorityListProps = {
    readonly authorities: readonly Authority[];
    readonly onSelectAuthority?: (authority: Authority) => void;
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
                <View style={styles.item}>
                    <Text style={styles.itemText} key={id}>
                        {name}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    return <FlatList data={authorities} renderItem={renderItem} />;
}

export { AuthorityList };
