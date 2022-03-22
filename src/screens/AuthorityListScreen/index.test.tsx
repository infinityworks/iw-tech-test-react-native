import React from 'react';

import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { AuthorityResource } from 'src/api/resources';
import { AuthorityListScreen } from '.';

describe('<AuthorityListScreen />', () => {
    const url = 'https://api.ratings.food.gov.uk/Authorities';

    const authorities: readonly AuthorityResource[] = [
        {
            LocalAuthorityId: 415,
            Name: 'Manchester',
        },
    ];

    const server = setupServer();

    beforeAll(() => server.listen());

    beforeEach(() => {
        server.use(
            rest.get(url, (_request, response, context) => {
                return response(context.json({ authorities }));
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
});
