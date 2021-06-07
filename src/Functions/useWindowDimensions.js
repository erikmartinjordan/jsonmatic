import { useEffect, useState } from 'react';

const useWindowDimensions = () => {

    const [height, setHeight] = useState(null);
    const [width,  setWidth]  = useState(null);

    useEffect(() => {

        const handleResolution = () => {

            setHeight(window.screen.height);
            setWidth(window.screen.width);
        }

        handleResolution();

        window.addEventListener('resize', handleResolution);

        return () => window.removeEventListener('resize', handleResolution);

    }, []);

    return [width, height];

}

export default useWindowDimensions;