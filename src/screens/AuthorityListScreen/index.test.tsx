import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { AuthorityResource } from 'src/api/resources';
import { AuthorityListScreen } from '.';
import { Authority } from 'src/models';

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

describe('<AuthorityListScreen />', () => {
    const url = 'https://api.ratings.food.gov.uk/Authorities';

    const authorityResources: readonly AuthorityResource[] = [
        {
            LocalAuthorityId: 413,
            Name: 'Leeds',
        },
        {
            LocalAuthorityId: 415,
            Name: 'Manchester',
        },
    ];

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

    const server = setupServer();

    beforeAll(() => server.listen());

    beforeEach(() => {
        server.use(
            rest.get(url, (_request, response, context) => {
                return response(context.json({ authorities: authorityResources }));
            }),
        );
    });

    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('renders authority list', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <AuthorityListScreen />
            </NavigationContainer>,
        );

        await waitFor(() => {
            expect(getByText('Manchester')).toBeTruthy();
        });
    });

    it('renders activity indicator (spinner) initially and then removes it', async () => {
        const { queryByTestId } = render(
            <NavigationContainer>
                <AuthorityListScreen />
            </NavigationContainer>,
        );

        expect(queryByTestId('activity-indicator')).toBeTruthy();
        await waitFor(() => expect(queryByTestId('activity-indicator')).toBeFalsy());
    });

    it('renders error message when fails to get authorities', async () => {
        server.use(
            rest.get(url, (_request, response, context) => {
                return response(context.status(403));
            }),
        );

        const { getByText } = render(
            <NavigationContainer>
                <AuthorityListScreen />
            </NavigationContainer>,
        );

        await waitFor(() => {
            expect(getByText('Failed to get authorities (403)')).toBeTruthy();
        });
    });

    it.each(authorities)(
        'navigates to detail screen when user selects authority "%j"',
        async (authority) => {
            const { getByText } = render(
                <NavigationContainer>
                    <AuthorityListScreen />
                </NavigationContainer>,
            );

            const { name } = authority;

            await waitFor(() => {
                expect(getByText(name)).toBeTruthy();
            });

            fireEvent.press(getByText(name));

            expect(mockNavigate).toHaveBeenCalledWith('AuthorityDetail', { authority });
        },
    );
});
