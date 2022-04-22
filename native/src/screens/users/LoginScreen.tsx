import * as React from 'react';

import { StyleSheet, View } from 'react-native';

import { Title } from 'react-native-paper';
import UIButton from '../../UI/UIButton';
import UITextInput from '../../UI/UITextInput';

export default function LoginScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Log in to your account</Title>
            <UITextInput onChangeText={(email: string) => setEmail(email)} value={email} placeholder='Email' />
            <UITextInput
                onChangeText={(password: string) => setPassword(password)}
                value={password}
                secureTextEntry={true}
                placeholder='Password'
            />

            <UIButton title='Sign In' onPress={() => null} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: '30%' },
    title: {
        alignSelf: 'center',
        marginBottom: 20,
    },
});
