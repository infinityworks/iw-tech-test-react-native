import React from 'react';
import { render } from '@testing-library/react-native';

import { LocalAuthority } from '../../models';
import { LocalAuthorityList } from '.';

describe('<LocalAuthorityList />', () => {
  let sampleLocalAuthorities: LocalAuthority[] = [
    {
      id: 198,
      name: 'Aberdeenshire',
    },
    {
      id: 406,
      name: 'York',
    },
  ];

  it('renders message when local authority list is empty', () => {
    const { getByText } = render(<LocalAuthorityList localAuthorities={[]} />);

    expect(getByText('No local authorities found.')).toBeTruthy();
  });

  it('renders local authority names', () => {
    const { getByText } = render(
      <LocalAuthorityList localAuthorities={sampleLocalAuthorities} />,
    );

    expect(getByText('Aberdeenshire')).not.toBeUndefined();
    expect(getByText('York')).not.toBeUndefined();
  });
});
