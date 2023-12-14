import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        justifyContent: 'center',
    },

    // Components
    // bottom tab bar
    bottomTabBar: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 10, 
        backgroundColor: Colors.header,
        height: 80,
    },

    // checkbox
    checkboxContainer:{
        flexDirection: "row",
        alignItems: "center",
      },
      checkbox:{
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#4B527E",
        borderRadius: 3,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      checkboxLabel: {
        fontSize: 15,
      },
      checkboxSelected: {
        color: "white",
        fontWeight: "bold",
      },

      // entry
      entryContainer: {
        // backgroundColor: '#7895CB',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        // add shade to the background
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    deleteButton: {
        borderRadius: 5,
        padding: 5,
        margin: 5,
        fontSize: 30,
    },
    entryItemText: {
        borderRadius: 5,
        color: Colors.entryItemText,
        fontSize: 24,
        alignSelf: 'center',
        padding: 10,
        overflow: 'hidden'
    },
    entryQuantityText: {
        borderRadius: 5,
        color: Colors.entryQuantityText,
        backgroundColor: Colors.entryQuantityBackground,
        fontSize: 20,
        alignSelf: 'center',
        padding: 8,
        overflow: 'hidden',
    },
    entryQuantityContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },

      // entries list
      entriesListContainer: {
        paddingTop: 30,
        flex: 1,
        minWidth: '80%'
    },

    // input
    inputContainer: {
        marginBottom: '5%',
    },
    input: {
        width: '100%',
        height: 30,
        borderRadius: 8,
        backgroundColor: 'white',
        alignSelf: 'flex-start', 
        fontSize: 18,
        color: '#190482',
        textAlign: 'left',
    },
    
    inputText: {
        color: '#190482',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginBottom: '2%',
    },

    // input form
    inputFormContainer: {
        padding: 20, 
      },
      inputFormText: {
        fontSize: 16, 
        marginBottom: 5, 
        fontWeight: 'bold',
        color: '#190482',
      },
      dropDown: {
        backgroundColor: 'white',
        marginBottom: 20, 
        borderRadius: 5,
        borderColor: '#190482',
      },

        dropDownText: {
            fontSize: 16,
            color: '#190482',
            fontWeight: 'bold',
        },
        dropDownLabel: {
            fontSize: 16,
            color: '#190482',
            fontWeight: 'bold',
        },

    // pressable button
    styleDefault: {
        borderRadius: 5,
        padding: 5,
    },

    // save and cancel buttons
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    buttonText: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelPressed: {
        backgroundColor: '#C70039',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    savePressed: {
        backgroundColor: '#0B666A',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    default: {
        backgroundColor: '#4B527E',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },


    linearGradient: {
        flex: 1,
        width: '100%',
    },


   
    
});