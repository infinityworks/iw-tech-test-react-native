import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react-native';

import AuthorityListScreen from '.';
import { Authority } from 'src/models';

import { getAuthorities } from 'src/api';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
    const actual = jest.requireActual('@react-navigation/native');

    return {
        ...actual,
        useNavigation: () => ({
            navigate: mockNavigate,
        }),
    };
});

jest.mock('src/api');

describe('<AuthorityListScreen />', () => {
    const mockGetAuthorities = getAuthorities as jest.Mock;

    const authorities: readonly Authority[] = [
        {
            id: 413,
            name: 'Leeds',
        },
        {
            id: 415,
            name: 'Manchester',
        },
    ];

    beforeEach(() => {
        mockGetAuthorities.mockResolvedValue(authorities);
    });

    it.each(authorities)('renders authority list', async ({ name }) => {
        const { getByText } = render(<AuthorityListScreen />);

        await waitFor(() => {
            expect(getByText(name)).toBeTruthy();
        });
    });

    it('renders activity indicator (spinner) initially and then removes it', async () => {
        const { queryByTestId } = render(<AuthorityListScreen />);

        expect(queryByTestId('activity-indicator')).toBeTruthy();
        await waitFor(() => expect(queryByTestId('activity-indicator')).toBeFalsy());
    });

    it('renders error message when fails to get authorities', async () => {
        const errorMessage = 'Failed to get authorities';

        mockGetAuthorities.mockRejectedValue(new Error(errorMessage));

        const { getByText } = render(<AuthorityListScreen />);

        await waitFor(() => {
            expect(getByText(errorMessage)).toBeTruthy();
        });
    });

    it.each(authorities)(
        'navigates to detail screen when user selects authority "%j"',
        async (authority) => {
            const { getByText } = render(<AuthorityListScreen />);

            const { name } = authority;

            await waitFor(() => {
                expect(getByText(name)).toBeTruthy();
            });

            fireEvent.press(getByText(name));

            expect(mockNavigate).toHaveBeenCalledWith('AuthorityDetail', { authority });
        },
    );
});
