import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Calendar from './Calendar';

const myStory = storiesOf('organisms')
    .add('calendar', () => (
        <Calendar />
    ))

export default myStory;