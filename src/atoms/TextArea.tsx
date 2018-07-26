import React from 'react'
import {
    Text,
    View
} from 'react-native'

interface TextProps {}

const TextArea: React.SFC<TextProps> = () => {
    return (
        <View>
            <Text>Hello, World!</Text>
        </View>
    )
}

export default TextArea