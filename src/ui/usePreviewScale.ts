import { useEffect, useState } from 'react';

export const usePreviewScale = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    contentWidth: number = 794,
    margin: number = 32
) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.clientWidth;
            const availableWidth = containerWidth - (margin * 2);

            const newScale = Math.min(availableWidth / contentWidth, 1);

            if (Math.abs(newScale - scale) > 0.01) {
                setScale(newScale);
            }
        };

        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    }, [containerRef, contentWidth, margin, scale]);

    return scale;
};
