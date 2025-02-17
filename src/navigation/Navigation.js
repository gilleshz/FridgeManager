import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {colors} from '../definitions/colors';
import Search from '../components/Search';
import Me from '../components/Me';
import Settings from '../components/Settings';
import Recipe from '../components/recipes/Recipe';
import MyRecipes from '../components/recipes/MyRecipes';
import AddIngredient from '../components/ingredients/AddIngredient';
import SavedIngredients from '../components/ingredients/SavedIngredients';

const SearchNavigation = createStackNavigator(
    {
        Search: Search,
        Recipe: Recipe
    },
    {
        initialRouteName: 'Search',
    }
);

const MeNavigation = createStackNavigator(
    {
        Me: Me,
        MyFridge: {
            screen: props => <SavedIngredients {...props} source="fridge" destination="list"/>,
            navigationOptions: {
                title: 'My fridge'
            },
        },
        MyList: {
            screen: props => <SavedIngredients {...props} source="list" destination="fridge"/>,
            navigationOptions: {
                title: 'My list'
            },
        },
        MyRecipes: {
            screen: MyRecipes,
            navigationOptions: {
                title: 'My recipes'
            },
        },
        Recipe: Recipe,
        AddIngredientToMyList: {
            screen: props => <AddIngredient {...props} destination="list"/>,
            navigationOptions: {
                title: 'Add to list'
            },
        },
        AddIngredientToMyFridge: {
            screen: props => <AddIngredient {...props} destination="fridge"/>,
            navigationOptions: {
                title: 'Add to fridge'
            },
        },
    },
    {
        initialRouteName: 'Me',
    }
);

const SettingsNavigation = createStackNavigator(
    {
        Settings: Settings
    },
    {
        initialRouteName: 'Settings',
    }
);

const TabNavigation = createBottomTabNavigator({
        Search: {
            screen: SearchNavigation,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Ionicons name="md-search" size={35} color={tintColor}/>
                },
            },
        },
        Me: {
            screen: MeNavigation,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Ionicons name="md-person" size={35} color={tintColor}/>
                },
            },
        },
        Settings: {
            screen: SettingsNavigation,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Ionicons name="md-settings" size={35} color={tintColor}/>
                },
            },
        },
    },
    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: colors.primary,
        },
        initialRouteName: 'Me',
    });

export default createAppContainer(TabNavigation);
