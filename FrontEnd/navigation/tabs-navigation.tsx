import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    CreateScreen,
    FilesScreen,
    HomeScreen,
    ProfileScreen, SearchScreen
} from '../screens';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: any }) => ({
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                    if (route.name === 'Home')
                        return (
                            <Entypo
                                name="home"
                                size={18}
                                color="white"
                                style={focused && styles.activeIcon}
                            />
                        );

                    if (route.name === 'Discovery')
                        return (
                            <FontAwesome
                                name="search"
                                size={17}
                                color="white"
                                style={focused && styles.activeIcon}
                            />
                        );

                    if (route.name === 'Create')
                        return (
                            <Entypo
                                name="plus"
                                size={18}
                                color="white"
                                style={focused && styles.activeIcon}
                            />
                        );

                    if (route.name === 'Files')
                        return (
                            <Entypo
                                name="folder"
                                size={18}
                                color="white"
                                style={focused && styles.activeIcon}
                            />
                        );

                    return (
                        <AntDesign
                            name="user"
                            size={18}
                            color="white"
                            style={focused && styles.activeIcon}
                        />
                    );
                },
                tabBarLabel: () => null,
                tabBarStyle: {
                    backgroundColor: '#222222',
                    borderTopWidth: 0,
                },
            })}>
            <Tab.Screen
                name="Home"
                options={{ headerShown: false }}
                component={HomeScreen}
            />
            <Tab.Screen
                name="Discovery"
                options={{ headerShown: false }}
                component={SearchScreen}
            />
            <Tab.Screen
                name="Create"
                options={{ headerShown: false }}
                component={CreateScreen}
            />
            <Tab.Screen
                name="Files"
                options={{ headerShown: false }}
                component={FilesScreen}
            />
            <Tab.Screen
                name="Profile"
                options={{ headerShown: false }}
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    activeIcon: {
        backgroundColor: '#d7044e',
        padding: 6,
        borderRadius: 75,
    },
});