import * as React from "react";
import { ButtonPrimary } from ".";
import { storiesOf } from "@storybook/react-native";
import { View, StyleSheet } from "react-native";


const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        color: "white"
    },
});

const stories = (storiesOf("atoms/ButtonPrimary", module) as any)
    .add("Unfocused with no icon", () => {
        const title = "button1";

        return (
            <View style={style.main}>
                Hello
                <ButtonPrimary
                    title={title}
                    // onPress={() => {}}
                />
                <ButtonPrimary
                    title={title}
                    // onPress={() => {}}
                />
            </View>
        );
    })
    .add("Another unfocused with no icon", () => {
        const title = "button2";

        return (
            <View style={style.main}>
                <ButtonPrimary
                    title={title}
                    // onPress={() => {}}
                />
            </View>
        );
    });

export default stories;