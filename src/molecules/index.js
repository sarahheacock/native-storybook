import React from 'react';
import { storiesOf } from '@storybook/react-native';

import TextAtom from '../atoms/TextAtom';
// import HeaderTwoAtom from '../atoms/HeaderTwoAtom';
import VerticalLineAtom from '../atoms/VerticalLineAtom';
import RowMolecule from './RowMolecule';

// atom has no position or padding but will scale to molecule
const myStory = storiesOf('Molecules')
    .add('shortRow', () => (
        <RowMolecule>
            <TextAtom>
                January
            </TextAtom>
            <TextAtom>
                2018
            </TextAtom>
        </RowMolecule>
    ))
    .add('longRow', () => (
        <RowMolecule>
            <TextAtom>
                MONDAY
            </TextAtom>
            <VerticalLineAtom />
            <TextAtom>
                TUESDAY
            </TextAtom>
        </RowMolecule>
    ))
 


export default myStory;