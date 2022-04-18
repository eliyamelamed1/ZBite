import * as React from 'react';

import { StatusBar, Text, View } from 'react-native';

import MainContainer from './src/components/Navbar';

function App() {
    return (
        <>
            <View style={{ marginTop: StatusBar.currentHeight }}></View>
            <MainContainer />
        </>
    );
}

export default App;
