import * as React from "react";
import { ButtonSecondary } from ".";
import { storiesOf } from "@storybook/react-native";


const stories = (storiesOf("atoms/ButtonSecondary", module) as any)
    .add("Unfocused with no icon", () => {
        const title = "button3";

        return (
            <ButtonSecondary
                title={title}
                // onPress={() => {}}
            />
        );
    });

export default stories;