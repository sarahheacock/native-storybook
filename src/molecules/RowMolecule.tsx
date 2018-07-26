import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

interface RowProps {
    children?: any
}

const styles = StyleSheet.create({
    grow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const RowMolecule: React.SFC<RowProps> = (props) => {
    return (
        <View style={styles.grow}>
            {props.children}
        </View>
    )
}

export default RowMolecule