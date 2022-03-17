import { LocalAuthority } from '../../../models';
import { LocalAuthorityResource } from '../resources';

function toModel(
  response: Array<LocalAuthorityResource>,
): Array<LocalAuthority> {
  const localAuthorities = response.map(each => ({
    id: each.LocalAuthorityId,
    name: each.Name,
  }));

  return localAuthorities.sort(({ name: a }, { name: b }) =>
    a.localeCompare(b),
  );
}

async function getLocalAuthorities(): Promise<readonly LocalAuthority[]> {
  const baseUrl = 'https://api.ratings.food.gov.uk';
  const url = `${baseUrl}/Authorities`;

  const options: RequestInit = {
    headers: {
      accept: 'application/json',
      'x-api-version': '2',
    },
  };

  const result = await fetch(url, options);
  const { status } = result;

  if (status !== 200) {
    throw new Error(`Failed to get local authorities (${status})`);
  }

  const response = await result.json();
  const { authorities } = response;

  return toModel(authorities);
}

export { getLocalAuthorities };
