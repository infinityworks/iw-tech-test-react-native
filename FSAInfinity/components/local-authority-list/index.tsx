import React, { ReactElement } from 'react';
import { FlatList, ListRenderItem, Text } from 'react-native';

import { LocalAuthority } from '../../models';

type LocalAuthorityListProps = {
  readonly localAuthorities: LocalAuthority[];
};

function LocalAuthorityList({
  localAuthorities,
}: LocalAuthorityListProps): ReactElement {
  if (localAuthorities.length === 0) {
    return <Text>No local authorities found.</Text>;
  }

  let renderItem: ListRenderItem<LocalAuthority> = ({ item }) => {
    let { id, name } = item;

    return <Text key={id}>{name}</Text>;
  };

  return <FlatList data={localAuthorities} renderItem={renderItem} />;
}

export { LocalAuthorityList };
