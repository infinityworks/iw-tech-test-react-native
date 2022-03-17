import { setupServer } from 'msw/node';
import { response, rest } from 'msw';

import { getLocalAuthorities } from '.';
import { LocalAuthorityResource } from '../resources';
import { LocalAuthority } from '../../../models';

describe('getEstablishments()', () => {
  const url = 'https://api.ratings.food.gov.uk/Authorities';

  const sampleLocalAuthorities: LocalAuthorityResource[] = [
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

  it('retrieves Local Authorities and sorts by name', async () => {
    server.use(
      rest.get(url, (_request, _response, context) => {
        return response(context.json({ authorities: sampleLocalAuthorities }));
      }),
    );

    let actual = await getLocalAuthorities();

    let expected: LocalAuthority[] = [
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
});
