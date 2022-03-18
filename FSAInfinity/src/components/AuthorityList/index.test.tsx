import React from 'react';
import { render } from '@testing-library/react-native';

import { Authority } from '../../models';
import { AuthorityList } from '.';

describe('<AuthorityList />', () => {
    let sampleAuthorities: Authority[] = [
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

    it('renders Authority names', () => {
        const { getByText } = render(<AuthorityList authorities={sampleAuthorities} />);

        expect(getByText('Aberdeenshire')).not.toBeUndefined();
        expect(getByText('York')).not.toBeUndefined();
    });
});
