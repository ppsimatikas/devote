import {candidates} from "../../data/candidates";
import {UiGlobe} from "./Globe";
import {Box, Card, Divider, MantineProvider, Text, Title} from "@mantine/core";
import ReactDOMServer from 'react-dom/server';


function GlobeLabel({properties, data}: { properties: any, data: any }) {
    const votes = Object.entries(data[properties.state]).map(([key, value]) => `${key}: ${(value as number).toLocaleString()} votes`)
    return (
        <MantineProvider>
            <Card shadow="lg" padding="xs" radius="md">
                <Title order={4}>{properties.name}</Title>
                <Text c="dimmed" size="xs">({properties.electoralVotes} electoral votes)</Text>
                <Divider my={10}/>
                {
                    votes.map((v) => <Text style={{ whiteSpace: 'nowrap' }} ta="left">{v}</Text>)
                }
            </Card>
        </MantineProvider>
    )
}

export function ResultsGlobe({width, data}: { width: number, data: any }) {
    function getColor(d: any) {
        const votes = data[d.properties.state];

        let mostVotes: number = 0;
        let mostVotesParty: string = '';
        Object.entries(votes).forEach(([key, value]) => {
            if (value as number > mostVotes) {
                mostVotes = value as number
                mostVotesParty = key
            }
        });

        const party = candidates.find((p) => p.title === mostVotesParty)

        return party?.color ?? '#ffffff'
    }

    return (
        <Box>
            <UiGlobe
                width={width} height={500}
                polygonCapColor={getColor}
                polygonLabel={({properties: d}: any) => ReactDOMServer.renderToString(<GlobeLabel properties={d}
                                                                                                  data={data}/>)}
            />
        </Box>
    )
}