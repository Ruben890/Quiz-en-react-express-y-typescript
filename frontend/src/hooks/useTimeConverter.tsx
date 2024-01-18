const useTimeConverter = () => {

    const convertTime = (timeString: string) => {
        const parts = timeString.split(':');
        if (parts.length === 1) {
            const minutes = parseInt(parts[0], 10);
            return { minutes };
        } else if (parts.length === 2) {
            const hours = parseInt(parts[0], 10);
            const minutes = parseInt(parts[1], 10);
            return { hours, minutes };
        } else {
            throw new Error('Invalid time format');
        }
    };

    return {
        convertTime
    };
};

export default useTimeConverter;
