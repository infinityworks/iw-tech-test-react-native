import React from 'react';

import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Authority } from 'src/models';
import { AuthorityDetailScreen } from '.';

const mockSetOptions = jest.fn();

const authority: Authority = {
    id: 879,
    name: 'Rutland',
};

jest.mock('@react-navigation/native', () => {
    const actual = jest.requireActual('@react-navigation/native');

    return {
        ...actual,
        useNavigation: () => ({
            setOptions: mockSetOptions,
        }),
        useRoute: () => ({
            params: {
                authority,
            },
        }),
    };
});

describe('<AuthorityDetailScreen />', () => {
    it('sets authority name as navigation title', () => {
        render(
            <NavigationContainer>
                <AuthorityDetailScreen />
            </NavigationContainer>,
        );

        expect(mockSetOptions).toBeCalledWith({
            title: authority.name,
        });
    });
});
