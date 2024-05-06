import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/colors';

const Width = Dimensions.get('window').width;

const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.homeScreenBodyColor,
    },
    tabView: {
        height: 80,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    titleStyle: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: '500',
        letterSpacing: 2,
    },
    bodyView: {
        flex: 1,
    },
    todoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 50,
        backgroundColor: '#742690',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: '500',
        letterSpacing: 2,
    },
});

export default HomeScreenStyle;
