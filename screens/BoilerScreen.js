// Importaciones React-Native y React essentials:
import { View, Text, Button } from "react-native"; // Importa los componentes básicos de la interfaz de usuario.
import styles from "./styles/GastosStyle"; // Importa estilos personalizados desde GastosStyle.
import AsyncStorage from "@react-native-async-storage/async-storage"; // Permite almacenar datos de manera local.
import { useEffect, useState } from "react";
import axios from "axios";
import Config from 'react-native-config';
import BoilerStatusIndicator from "../components/BoilerStatusIndicator";

// Aquí definimos el componente BoilerScreen, un lugar para hacer cambios mágicos:
const BoilerScreen = ({ navigation }) => {
    const API_URL_BOILER = Config.API_URL_BOILER;
    const [boilerState, setBoilerState] = useState(null);
    // Función para enviar comando a la calefacción
    const sendBoilerCommand = (accion) => {
        axios.post(`${API_URL_BOILER}/calefaccion`, {
            accion: accion
        })
            .then(response => {
                setTimeout(fetchBoilerState, 2000);
                console.log("respuesta de accion enviada", response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const fetchBoilerState = () => {
        axios.get(`${API_URL_BOILER}/estado-calefaccion`)
            .then(response => {
                console.log("estado actual recibido: ", response.data.state)
                setBoilerState(response.data.state);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // useEffect al rescate para llamar a handleLogin cuando el componente se monte.
    useEffect(() => {
        fetchBoilerState();
    }, [])

    // El renderizado del componente: una elegante pantalla para mostrar los datos.
    return (
        <View style={styles.safeAreaContainer}>
            <Text style={styles.title}>Control de la calefacción</Text>
            <BoilerStatusIndicator boilerState={boilerState}/>
            <View style={{ flexDirection: 'row' ,  margin: 20 }}>
                <Button
                    title="Encender Calefacción"
                    onPress={() => sendBoilerCommand('1')}
                    style={{ marginRight: 20 }}
                />
                <Button
                    title="Apagar Calefacción"
                    onPress={() => sendBoilerCommand('0')}
                    style={{ marginLeft: 20 }}
                />
            </View>
        </View>
    );
}
export default BoilerScreen;
