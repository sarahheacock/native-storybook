import * as React from "react";
import { MyFrame } from './MyFrame';

export const CenterDecorator = (storyFn: () => any) => (
    <MyFrame>
        { storyFn() }
    </MyFrame>
)

