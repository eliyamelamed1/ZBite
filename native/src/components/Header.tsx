import * as React from 'react';

import { Image, StyleSheet, Text, Touchable, View } from 'react-native';

import SearchBar from './SearchBar';
import { colors } from '../constants/colors';

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../assets/logo.png')} />
            </View>
            <View style={styles.searchBarContainer}>
                <SearchBar />
            </View>
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
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 0.3,
        alignItems: 'center',
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    icon: {
        width: 25,
        height: 25,
    },
    searchBarContainer: {
        flex: 2,
        marginHorizontal: 10,
    },

    auth: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
});
