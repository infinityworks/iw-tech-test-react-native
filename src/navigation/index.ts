import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Authority } from 'src/models';

type AuthorityDetailParams = {
    readonly authority: Authority;
};

type RootStackParamList = {
    readonly AuthorityList: undefined;
    readonly AuthorityDetail: AuthorityDetailParams;
};

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

type AuthorityDetailRoute = RouteProp<RootStackParamList, 'AuthorityDetail'>;

export type {
    AuthorityDetailParams,
    AuthorityDetailRoute,
    RootStackParamList,
    RootStackNavigation,
};
