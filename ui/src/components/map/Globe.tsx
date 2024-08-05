import Globe, {GlobeProps} from "react-globe.gl";
import {useEffect, useRef, useState} from "react";
import states from "../../data/states.json";

export interface UiGlobeProps extends GlobeProps {
    animate?: boolean
}

export function UiGlobe({animate, ...props}: UiGlobeProps) {
    const globeEl: any = useRef()
    const [hoverD, setHoverD] = useState<object | null>();

    useEffect(() => {
        if (globeEl && globeEl.current) {
            const altitude = (props.width ?? 0) > 500 ? 0.5 : 0.8
            globeEl.current.pointOfView({
                lat: 37.09024,
                lng: -95.712891,
                altitude
            }, 0);
        }
    }, [globeEl, props.width]);

    return (
        <Globe
            {...props}
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            polygonsData={states.features}
            polygonSideColor={() => 'rgba(100, 100, 100, 1)'}
            polygonAltitude={d => d === hoverD ? 0.02 : 0.005}
            polygonCapColor={(d: any) => {
                const color = props.polygonCapColor ? (props.polygonCapColor as any)(d) : '#e2e2e2'
                const opacity = d === hoverD ? 'FF' : '99'
                return `${color}${opacity}`
            }}
            onPolygonHover={setHoverD}
            polygonsTransitionDuration={300}
            lineHoverPrecision={0}
        />
    )
}