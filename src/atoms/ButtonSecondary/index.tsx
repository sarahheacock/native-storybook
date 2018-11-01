import * as React from "react";
import { GestureResponderEvent, Text, TouchableHighlight, View, StyleSheet } from "react-native";

export interface ButtonSecondaryProps {
    title: string;
    // onPress?: (event: GestureResponderEvent) => void;
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        color: "white",
    },
});


export function ButtonSecondary(props: ButtonSecondaryProps) {
    return (
        <View style={style.main}>
            <TouchableHighlight onPress={() => {}}>
                <Text>{props.title}</Text>
            </TouchableHighlight>
        </View>
    );
}