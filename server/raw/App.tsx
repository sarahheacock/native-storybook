import React from 'react'
import { Component } from 'react';
import {
  View
} from 'react-native';


/* NEWCOMP */import { ButtonPrimary } from '/Users/sheacock/Desktop/NativeDemo/src/atoms/ButtonPrimary';/* NEWCOMP */


type Props = {};
export default class App extends Component<Props> {
    render() {
        /* NEWPROPS */return ( <View><ButtonPrimary title="button2" /></View> );/* NEWPROPS */
    }
}

