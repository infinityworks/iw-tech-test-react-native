import { getEstablishments } from '.';

describe('getEstablishments()', () => {
  it('retrieves establishments for specified Local Authority', () => {
    let establishments = getEstablishments();

    expect(establishments).toStrictEqual([]);
  });
});
