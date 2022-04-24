import * as React from 'react';

import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';

interface PropTypes {
    placeholder: string;
    onChangeText: (arg: string) => void;
    value: string;
    style?: StyleProp<TextStyle>;
    secureTextEntry?: boolean;
}

const UITextInput = ({ placeholder, style, onChangeText, value, secureTextEntry = false }: PropTypes) => {
    return (
        <TextInput
            style={[styles.input, style]}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: 250,
        alignSelf: 'center',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 1.5,
        borderColor: '#d9d0e3',
    },
});

export default UITextInput;
