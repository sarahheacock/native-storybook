import React from 'react'
import { Component } from 'react';
import {
  View
} from 'react-native';


/* NEWCOMP */import MyComponent from '/Users/sheacock/Desktop/NativeDemo/src/atoms/TextArea';/* NEWCOMP */
/* NEWPROPS */const myProps = {
    text: "bye"
};/* NEWPROPS */


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View>
                <MyComponent {...myProps} />
            </View>
        );
    }
}

