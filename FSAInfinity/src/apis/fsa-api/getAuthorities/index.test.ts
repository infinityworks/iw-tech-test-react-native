import { setupServer } from 'msw/node';
import { response, rest } from 'msw';

import { getAuthorities } from '.';
import { AuthorityResource } from '../resources';
import { Authority } from '../../../models';

describe('getAuthorities()', () => {
    const url = 'https://api.ratings.food.gov.uk/Authorities';

    const sampleAuthorities: AuthorityResource[] = [
        {
            LocalAuthorityId: 406,
            Name: 'York',
        },
        {
            LocalAuthorityId: 198,
            Name: 'Aberdeenshire',
        },
    ];

    const server = setupServer();

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });

    it('retrieves authorities and sorts by name', async () => {
        server.use(
            rest.get(url, (_request, _response, context) => {
                return response(context.json({ authorities: sampleAuthorities }));
            }),
        );

        let actual = await getAuthorities();

        let expected: Authority[] = [
            {
                id: 198,
                name: 'Aberdeenshire',
            },
            {
                id: 406,
                name: 'York',
            },
        ];

        expect(actual).toStrictEqual(expected);
    });

    it('throws when fails to get authorities', async () => {
        server.use(
            rest.get(url, (_request, _response, context) => {
                return response(context.status(500));
            }),
        );

        await expect(getAuthorities()).rejects.toThrow('Failed to get authorities (500)');
    });
});
