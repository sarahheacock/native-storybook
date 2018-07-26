import React from 'react';
import {
    ScrollView,
    View,
    Text
} from 'react-native'

// import HorizontalLineAtom from '../atoms/HorizontalLineAtom';
// import VerticalLineAtom from '../atoms/VerticalLineAtom';
// import TextAtom from '../atoms/TextAtom';
// import RowMolecule from '../molecules/RowMolecule';
// import SquareMolecule from '../molecules/SquareMolecule';


// Header 
// weeks
// 5 number rows with 7 squares
interface CalendarProps {

}

// Month, year, arrows
// days
// numbers
// clear, apply

class Calendar extends React.Component<CalendarProps> {
    render() {
        const days = ['s', 'm', 't', 'w', 'r', 'f', 's'];
        return (
            <ScrollView style={{}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    {days.map((d, i) => (
                        <View key={`day${i}`} style={{
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderLeftColor: '#cc9900',
                            borderRightColor: '#cc9900',
                            flexGrow: 1
                        }}>
                            <Text style={{
                                fontSize: 20,
                                textAlign: 'center'
                            }}>{d}</Text>
                        </View>
                    ))}
                </View>
                
            </ScrollView>
        )
    }
}

{/* <RowMolecule>
                    <TextAtom styleType="one">
                        january
                    </TextAtom>
                    <TextAtom styleType="one">
                        2018
                    </TextAtom>
                </RowMolecule>
                <RowMolecule>
                    {days.map((day, i) => (
                        <SquareMolecule key={`${day}${i}`}>
                            {day}
                        </SquareMolecule>
                    ))}
                </RowMolecule>
                <HorizontalLineAtom />
                <RowMolecule>
                    {[...new Array(7)].map((day, i) => (
                        <RowMolecule key={`date${i}`}>
                            <VerticalLineAtom />
                            <TextAtom>
                                {i.toString()}
                            </TextAtom>
                        </RowMolecule>
                    ))}
                </RowMolecule>
                <HorizontalLineAtom /> */}

export default Calendar;

