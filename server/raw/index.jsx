import React from 'react'
import { Component } from 'react';
import {
  View
} from 'react-native';


/* NEWCOMP */import MyComponent from '/Users/sheacock/Desktop/NativeDemo/src/atoms/TextArea';/* NEWCOMP */
/* NEWPROPS */const myProps = {
    text: "bye"
};/* NEWPROPS */

// look into bundeling and then transpiling with webpack then 

// type Props = {};
class App extends Component {
    render() {
        return (
            <View>
                <MyComponent {...myProps} />
            </View>
        );
    }
}


AppRegistry.registerComponent('NativeDemo', () => App);
