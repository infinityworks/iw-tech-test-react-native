import React, { ReactElement, useLayoutEffect } from 'react';

import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AuthorityDetailRoute, RootStackNavigation } from 'src/navigation';

type Rating = {
    readonly label: String;
    readonly value: String;
};

function getRatings(): Rating[] {
    return [
        { label: '1', value: '55%' },
        { label: '2', value: '55%' },
        { label: '3', value: '55%' },
        { label: '4', value: '55%' },
        { label: '5', value: '55%' },
        { label: 'Pass', value: '55%' },
        { label: 'Exempt', value: '55%' },
    ];
}

function AuthorityDetailScreen(): ReactElement {
    const route = useRoute<AuthorityDetailRoute>();
    const navigation = useNavigation<RootStackNavigation>();

    const { name: authorityName } = route.params.authority;

    const title = `${authorityName} - Ratings`;
    const ratings = getRatings();

    useLayoutEffect(() => {
        navigation.setOptions({ title: authorityName });
    });

    let renderItem: ListRenderItem<Rating> = ({ item: rating }) => {
        const { label, value } = rating;

        return (
            <Text>
                {label} - {value}
            </Text>
        );
    };

    return (
        <View>
            <Text>{title}</Text>
            <FlatList data={ratings} renderItem={renderItem} />
        </View>
    );
}

export { AuthorityDetailScreen };
