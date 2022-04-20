import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Authority } from 'src/models';

export type AuthorityDetailParams = {
    readonly authority: Authority;
};

export type RootStackParamList = {
    AuthorityList: undefined;
    AuthorityDetail: AuthorityDetailParams;
};

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

export type AuthorityDetailRoute = RouteProp<RootStackParamList, 'AuthorityDetail'>;
