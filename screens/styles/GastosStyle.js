import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },

});
export default styles;