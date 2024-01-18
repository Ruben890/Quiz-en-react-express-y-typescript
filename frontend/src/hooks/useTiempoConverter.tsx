import { useState } from 'react';

const useTiempoConverter = (tiempoStringInicial: string) => {
    const [tiempoString, setTiempoString] = useState(tiempoStringInicial);

    const convertirTiempo = () => {
        const partes = tiempoString.split(':');
        if (partes.length === 1) {
            const minutos = parseInt(partes[0], 10);
            return { minutos };
        } else if (partes.length === 2) {
            const horas = parseInt(partes[0], 10);
            const minutos = parseInt(partes[1], 10);
            return { horas, minutos };
        } else {
            throw new Error('Formato de tiempo no válido');
        }
    };

    const { horas, minutos } = convertirTiempo();
    return {
        horas,
        minutos,
        tiempoString,
        setTiempoString,
    };
};

export default useTiempoConverter