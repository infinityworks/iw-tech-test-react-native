import React from 'react';
import { render } from '@testing-library/react-native';

import { Authority } from 'src/models';
import { AuthorityList } from '.';

describe('<AuthorityList />', () => {
    let authorities: Authority[] = [
        {
            id: 198,
            name: 'Aberdeenshire',
        },
        {
            id: 406,
            name: 'York',
        },
    ];

    it('renders message when authority list is empty', () => {
        const { getByText } = render(<AuthorityList authorities={[]} />);

        expect(getByText('No authorities found.')).toBeTruthy();
    });

    it('renders authority names', () => {
        const { getByText } = render(<AuthorityList authorities={authorities} />);

        expect(getByText('Aberdeenshire')).toBeTruthy();
        expect(getByText('York')).toBeTruthy();
    });
});
