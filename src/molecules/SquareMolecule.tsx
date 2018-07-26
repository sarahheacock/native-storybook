import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

interface SquareProps {
    children?: any
}

const styles = StyleSheet.create({
    grow: {
        flex: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderLeftColor: '#cc9900'
    }
})

const SquareMolecule: React.SFC<SquareProps> = (props) => {
    return (
        <View style={styles.grow}>
            <View style={{flex:1}}>
            {props.children}
            </View>
        </View>
    )
}

export default SquareMolecule