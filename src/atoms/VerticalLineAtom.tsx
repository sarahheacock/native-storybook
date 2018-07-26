import React from 'react'
import {
    View
} from 'react-native'

interface lineProps {}

const VerticalLineAtom: React.SFC<lineProps> = () => {
    return (
        <View style={{
            height: 15,
            width: 0,
            borderLeftWidth: 1,
            borderLeftColor: '#cc9900'
        }}/>
    )
}

export default VerticalLineAtom