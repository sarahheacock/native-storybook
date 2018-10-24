// import React from 'react';
// import {
//     Text,
//     View,
//     StyleSheet
// } from 'react-native'

// interface TextProps {
//     children?: string,
//     styleType?: string
// }



// const styles = StyleSheet.create({
//     one: {
//         color: '#00b3b3',
//         fontSize: 30
//     },
//     two: {
//         color: '#00b3b3',
//         fontSize: 15
//     }, 
//     three: {
//         fontSize: 15
//     },
//     default: {
//         fontSize: 15
//     }
// })

// const TextAtom: React.SFC<TextProps> = (props) => {
//     const styleType: string = props.styleType || 'default';
//     const myStyle: { color?: string; fontSize: number; } = styles[styleType];

//     return (
//         <View>
//             <Text style={myStyle}>{props.children}</Text>
//         </View>
//     )
// }

import * as React from 'react';

interface TextProps {
    children?: string
}

const TextAtom = (props: TextProps): any => (
    <div>{props.children}</div>
)

export default TextAtom;