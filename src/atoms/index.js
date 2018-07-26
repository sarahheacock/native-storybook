import React from 'react';
import { storiesOf } from '@storybook/react-native';

import {
    View,
    // Text
} from 'react-native'

import TextAtom from './TextAtom';
import VerticalLineAtom from './VerticalLineAtom';
import HorizontalLineAtom from './HorizontalLineAtom';

// atom has no position or padding but will scale to molecule
const myStory = storiesOf('Atoms')
    .add('verticalLine', () => (
        <VerticalLineAtom />
    ))
    .add('horizontalLine', () => (
        <View>
            <TextAtom styleType="one">
                Hello, World
            </TextAtom>
            <HorizontalLineAtom />
        </View>
    ))
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