import * as React from "react";
import { GestureResponderEvent, Text, TouchableHighlight, View, StyleSheet } from "react-native";

export interface ButtonPrimaryProps {
    title: string;
    // onPress?: (event: GestureResponderEvent) => void;
}

// const defaultProps: ButtonPrimaryProps = {
//     title: "",
//     // onPress: (): void => { /*noop*/ },
// };

const style = StyleSheet.create({
    main: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "green",
        // color: "white"
    },
});


export function ButtonPrimary(props: ButtonPrimaryProps) {
    return (
        <TouchableHighlight onPress={() => {}}>
            <Text>{props.title}</Text>
        </TouchableHighlight>
    );
    // return (
    //     <TouchableHighlight onPress={() => {}}>
    //         <Text>{props.title}</Text>
    //     </TouchableHighlight>
    // );
}