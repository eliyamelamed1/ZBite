import * as React from 'react';

import { Image, StyleSheet, Text, Touchable, View } from 'react-native';

import { Searchbar } from 'react-native-paper';
import { colors } from '../constants/colors';

export default function Header() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../assets/logo.png')} />
            </View>
            <Searchbar
                placeholder='Search'
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            <View style={styles.auth}>
                <Text style={{ fontSize: 12, color: colors.text }}>Login</Text>
                <Text style={{ fontSize: 12, color: colors.text }}>Signup</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: colors.primaryColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 0.5,
        alignItems: 'center',
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    icon: {
        width: 30,
        height: 30,
    },
    searchBar: {
        display: 'flex',
        flex: 2,
        marginHorizontal: 10,
        height: 30,
    },

    auth: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
});
