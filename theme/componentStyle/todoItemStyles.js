import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assest/colors';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const TodoItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff',
        margin: 10,
        borderRadius: 15,
    },
    itemContainer: {
        justifyContent: 'center',
        backgroundColor: '#FFF',
        flex: 1,
        borderRadius: 15,
    },
    itemContainerView: {
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    infoContainerView: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10
    },
    priorityView: {
        flex: 1,
        paddingLeft: 40
    },
    timeView: {
        flex: 1,
        alignItems: "flex-end"
    },
    checkboxView: {
        flex: 1,
        justifyContent: "center"
    },
    titleView: {
        flex: 8,
    },
    titleText: {
        fontSize: 15,
        fontWeight: "600"
    },
    editButtonView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    editButtonIcon: {
        height: 20,
        width: 20
    },
    // saveButtom
    saveButtomStyle: {
        backgroundColor: colors.buttomColor,
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25
    },
    saveButtomText: {
        color: "#FFF",
        letterSpacing: 2,
        fontWeight: 'bold',

    },
    checkboxIcon: {
        width: 20,
        height: 20,
    },
    renderItemTimeText: {
        fontSize: 15,
    },
    // TextInput
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b0b4bb',
        marginTop: 15,
    },
    textInputTitleStyle: {
        height: 40,
        fontWeight: 'bold',
        fontSize: 15,
    },
    inputLabel: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: "black"
    },
    textInput: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        textAlign: 'right',
        textAlignVertical: 'center',
        fontSize: 15,
        letterSpacing: 1
    },
    ///dropdown
    dropdownView: {
        flex: 1,
        alignItems: "flex-end"
    },
    dropdown: {
        borderColor: 'gray',
        paddingHorizontal: 5,
        width: 130,
        marginLeft: 0
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 15,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
});



export default TodoItemStyles;




