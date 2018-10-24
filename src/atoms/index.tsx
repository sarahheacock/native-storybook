import * as React from 'react';
// import { storiesOf } from '@storybook/react-native';
import { storiesOf } from '@storybook/react';

import TextAtom from './TextAtom';
// import VerticalLineAtom from './VerticalLineAtom';
// import HorizontalLineAtom from './HorizontalLineAtom';

// atom has no position or padding but will scale to molecule
const myStory = (storiesOf('atoms', module) as any)
    .add('textOne', () => (
        <TextAtom styleType="one">
            Hello, World
        </TextAtom>
    ))
    .add('textTwo', () => (
        <TextAtom styleType="two">
            Hello, World
        </TextAtom>
    ))
    .add('textThree', () => (
        <TextAtom styleType="three">
            Hello, World
        </TextAtom>
    ))
    .add('textDefault', () => (
        <TextAtom>
            Hello, World
        </TextAtom>
    ))


export default myStory;