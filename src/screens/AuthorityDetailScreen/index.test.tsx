import React from 'react';

import { render } from '@testing-library/react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Authority } from 'src/models';
import AuthorityDetailScreen from '.';

jest.mock('@react-navigation/native');

describe('<AuthorityDetailScreen />', () => {
    const mockUseNavigation = useNavigation as jest.Mock;
    const mockUseRoute = useRoute as jest.Mock;

    const mockSetOptions = jest.fn();

    const authority: Authority = {
        id: 879,
        name: 'Rutland',
    };

    beforeEach(() => {
        mockUseNavigation.mockReturnValue({
            setOptions: mockSetOptions,
        });

        mockUseRoute.mockReturnValue({
            params: {
                authority,
            },
        });
    });

    it('sets navigation title to authority name', () => {
        render(<AuthorityDetailScreen />);

        expect(mockSetOptions).toBeCalledWith({
            title: authority.name,
        });
    });
});
