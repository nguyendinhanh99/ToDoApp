import { StyleSheet, Dimensions, Switch } from 'react-native';
import { colors } from '../../assest/colors';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const WellcomereenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bodyColor
    },
    topView : {
        flex: 7,
        justifyContent : "center",
        alignItems: "center",
        backgroundColor: "#fac863",
        borderBottomStartRadius: 150, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    iconAppStyle : {
        width: 110, 
        height: 110, 
        marginBottom: 10,
    },
    appNameStyle : {
        fontSize: 35, 
        fontWeight: 'bold',
        color: "#FFF",
        marginTop: 20,
        letterSpacing: 3,
        fontWeight: "700",

    },
    titleStyle : {
        fontSize: 25, 
        fontWeight: 'bold',
        color: "#FFF",
        marginTop: 30,
        letterSpacing: 3,

    },
    bottomView : {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    buttomStyle : {
        height : 60,
        backgroundColor: "#fac863",
        width: Width-40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    buttomTextStyle : {
        fontSize: 25,
        fontWeight: "700",
        color: "#FFF",
        letterSpacing:2,
    }
});



export default WellcomereenStyle;
