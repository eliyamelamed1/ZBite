import * as React from 'react';

import { Text, View } from 'react-native';

type PropsType = {
    navigation: {
        navigate: (path: string) => void;
    };
};
export default function HomeScreen({ navigation }: PropsType) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => alert('This is the "Home" screen.')} style={{ fontSize: 26, fontWeight: 'bold' }}>
                Home Screen
            </Text>
        </View>
    );
}
