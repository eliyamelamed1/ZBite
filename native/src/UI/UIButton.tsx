import * as React from 'react';

import { Button, StyleProp, Text, TextStyle, View } from 'react-native';

import { StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { colors } from '../constants/colors';

interface PropTypes {
    onPress: () => void;
    title?: string;
}
const UIButton = ({ onPress, title = 'Submit' }: PropTypes) => {
    return (
        <TouchableHighlight style={styles.container} onPress={() => null} underlayColor={colors.primaryColorOpacity}>
            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: colors.primaryColor,
        borderRadius: 20,
        padding: 10,
        width: 120,
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
});

export default UIButton;
