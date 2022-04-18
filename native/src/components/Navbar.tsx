import * as React from 'react';

import AddRecipeScreen from '../screens/AddRecipeScreen';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import SavedRecipesScreen from '../screens/SavedRecipesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screenRoutes from '../utils/screenRoutes';

const Tab = createBottomTabNavigator();

function Navbar() {
    return (
        <NavigationContainer>
            {/* @ts-ignore */}
            <Tab.Navigator
                initialRouteName={screenRoutes.home}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = '';
                        let rn = route.name;

                        switch (rn) {
                            case screenRoutes.home:
                                iconName = focused ? 'home' : 'home-outline';
                                break;
                            case screenRoutes.savedRecipes:
                                iconName = focused ? 'heart' : 'heart-outline';
                                break;
                            case screenRoutes.addRecipe:
                                iconName = focused ? 'add-circle' : 'add-circle-outline';
                                break;
                            case screenRoutes.leaderboard:
                                iconName = focused ? 'medal' : 'medal-outline';
                                break;
                            case screenRoutes.profile:
                                iconName = focused ? 'account-circle' : 'account-circle-outline';
                                break;

                            default:
                                break;
                        }
                        const MCIcons = iconName === 'account-circle' || iconName === 'account-circle-outline';

                        if (MCIcons) {
                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70 },
                }}
            >
                <Tab.Screen name={screenRoutes.home} component={HomeScreen} />
                <Tab.Screen name={screenRoutes.savedRecipes} component={SavedRecipesScreen} />
                <Tab.Screen name={screenRoutes.addRecipe} component={AddRecipeScreen} />
                <Tab.Screen name={screenRoutes.leaderboard} component={LeaderboardScreen} />
                <Tab.Screen name={screenRoutes.profile} component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navbar;
