import { Button, View, Text } from "react-native";
import styles from "./styles/IngresosStyle";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Config from 'react-native-config';

const EliminarScreen = ({ navigation }) => {
    const apiURL = Config.API_URL;
    const [humedad, setHumedad] = useState(null);
    const [ultimas_humedades, setUltimasHumedades] = useState(null);
    const [humedadError, setHumedadError] = useState(null);
    const [mediana, setMediana] = useState(null);
    const [timestamp, setTimestamp] = useState("");
    const [sensacionHumedad, setSensacionHumedad] = useState(null);
    const cargandoDatos = "Cargando datos...";

    const fetchHumedad = async () => {
        try {
            const response = await axios.get(`${apiURL}/humedad`);
            const data = response.data;

            // Verificar si se produjo un error en la lectura de la humedad
            if (data.error) {
                setHumedadError(data.error);
                return;
            }

            // Actualizar el estado de la humedad y otros datos relacionados
            setHumedad(data.humedad);
            setUltimasHumedades(data.ultimas_humedades);
            setMediana(data.mediana);
            setTimestamp(data.timestamp);

            // Calcular la sensación de humedad
            calcularSensacionHumedad(data.humedad);
        } catch (error) {
            // Manejar errores de solicitud
            setHumedadError("Error al obtener la humedad.");
            console.error("Error al obtener la humedad:", error);
        }
    };


    function calcularSensacionHumedad(humedad) {
        let sensacion = "";
        
        if (humedad < 30) {
            sensacion = "Sequedad";
        } else if (humedad >= 30 && humedad < 60) {
            sensacion = "Confortable";
        } else {
            sensacion = "Húmedo";
        }
    
        setSensacionHumedad(sensacion);
    }
    

    useEffect(() => {
        fetchHumedad();
    }, []);

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.title}>Humedad del Ambiente</Text>
                {/* Aquí puedes renderizar el gráfico de humedad si lo deseas */}
                <Text style={styles.title}>{humedad ? `Última lectura: ${humedad}%` : cargandoDatos}</Text>
                <Text style={styles.subtitle}>{mediana ? `Mediana: ${mediana}` : cargandoDatos}</Text>
                {/* Aquí puedes mostrar la sensación de humedad si lo deseas */}
                <Text style={styles.subtitle}>{sensacionHumedad ? `Sensación de Humedad: ${sensacionHumedad}` : cargandoDatos}</Text>
                <Text style={styles.subtitle}>{humedadError ? `Error de lectura: ${humedadError}` : 'Lectura correcta'}</Text>
                <Button title="Actualizar Humedad" onPress={fetchHumedad} />
            </View>
        </SafeAreaView>
    );
}

export default EliminarScreen;
