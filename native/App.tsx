import * as React from 'react';

import { StatusBar, Text, View } from 'react-native';

import Header from './src/components/Header';
import MainContainer from './src/components/Navbar';

function App() {
    return (
        <>
            <View style={{ marginTop: StatusBar.currentHeight }}></View>
            <Header />
            <MainContainer />
        </>
    );
}

export default App;
