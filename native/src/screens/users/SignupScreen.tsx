import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import { Title } from 'react-native-paper';
import UIButton from '../../UI/UIButton';
import UITextInput from '../../UI/UITextInput';

export default function SignupScreen() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Create an account</Title>
            <UITextInput onChangeText={(name: string) => setName(name)} value={name} placeholder='Name' />
            <UITextInput onChangeText={(email: string) => setEmail(email)} value={email} placeholder='Email' />
            <UITextInput
                onChangeText={(password: string) => setPassword(password)}
                value={password}
                secureTextEntry={true}
                placeholder='Password'
            />
            <UITextInput
                onChangeText={(confirmPassword: string) => setConfirmPassword(confirmPassword)}
                value={confirmPassword}
                secureTextEntry={true}
                placeholder='Confirm Password'
            />
            <UIButton title='Register' onPress={() => null} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: '10%' },
    title: {
        alignSelf: 'center',
        marginBottom: 20,
    },
});
