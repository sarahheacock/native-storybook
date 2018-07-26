import React from 'react'
import {
    View
} from 'react-native'

interface lineProps {}


const VerticalLineAtom: React.SFC<lineProps> = () => {
    return (
        <View style={{flex: 1}}>
            <View style={{
                height: 0,
                borderBottomWidth: 1,
                flex: 1,
                borderBottomColor: '#cc9900'
            }}/>
        </View>
    )
}

export default VerticalLineAtom