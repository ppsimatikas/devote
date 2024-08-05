import {Stack, Title} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {ResultsGlobe} from "../components/map/ResultsGlobe";
import {useResults} from "../data-access/contracts";
import {UiLoader} from "../components/loader";
import {ResultsBar} from "../components/ResultsBar";

function Results() {
    const ref = useRef(null)
    const [width, setWidth] = useState<number>(0);
    const {data, isLoading} = useResults();

    useEffect(() => {
        if (ref && ref.current) {
            setWidth((ref.current as any).offsetWidth)
        }
    }, [ref]);

    return (
        <Stack ref={ref}>
            <Title ta="center" size="4vw">2024 U.S. Election Results</Title>
            {isLoading && <UiLoader/>}
            {data && <ResultsBar data={data}/>}
            {width && data && <ResultsGlobe width={width} data={data} />}
        </Stack>
    );
}

export default Results;
