import {Box, Group, Stack, Text} from "@mantine/core";
import states from "../data/states.json";
import {blueColor, redColor} from "../theme";
import {Explanation} from "./Explanation";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints";

function getResults(party: string, against: string, data: any): [number, number, number] {
    const allEvs = states.features.reduce((evs, state: any) => evs + state.properties.electoralVotes, 0)
    const ev = states.features.reduce((electoralVotes, state) => {
        const votes = data[state.properties.state]
        if (votes[party] > votes[against]) {
            return electoralVotes + state.properties.electoralVotes;
        }
        return electoralVotes
    }, 0)
    const evPerc = allEvs === 0 ? 0 : ev * 100 / allEvs
    const votes = Object.values(data).reduce((res, vs) => res + (vs as any)[party], 0)

    return [ev, evPerc, votes as number]
}

function getPercentage(numbers: number[], num: number): number {
    const sum = numbers.reduce((s, v) => s + v, 0);
    return sum === 0 ? 0 : num * 100 / sum
}

export function ResultsBar({data}: { data: any }) {
    const {isSm} = useUiBreakpoints();

    const [democratEV, democratEVPerc, allDemocratVotes] = getResults('Democrats', 'Republicans', data)
    const [republicanEV, republicanEVPerc, allRepublicanVotes] = getResults('Republicans', 'Democrats', data)

    const remainingPerc = Math.max(100 - (democratEVPerc + republicanEVPerc), 0)

    const size = isSm ? "4.5vw" : "30px";

    return (
        <Stack gap={5}>
            <Group justify="space-between" mb={5}>
                <Text c="blue" fw="bold" size={size}>Democrats</Text>
                <Text c="grey" size={size}>270 to win</Text>
                <Text c="red" fw="bold" size={size}>Republicans</Text>
            </Group>
            <Group gap={0} style={{
                position: "relative",
            }}>
                <Box
                    style={{
                        position: "absolute",
                        width: '2px',
                        height: '30px',
                        backgroundColor: 'grey',
                        margin: 'auto',
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                />
                {democratEV && <Box w={`${democratEVPerc}%`} c="white" bg={blueColor} pl={10}>{democratEV}</Box>}
                <Box w={`${remainingPerc}%`} c="white" bg="#e2e2e2">&nbsp;</Box>
                {republicanEV && <Box w={`${republicanEVPerc}%`} c="white" bg={redColor} pr={10} ta="right">{republicanEV}</Box>}
            </Group>
            <Group justify="space-between">
                <Group>
                    <Text fw="bold">{getPercentage([allDemocratVotes, allRepublicanVotes], allDemocratVotes).toFixed()}%</Text>
                    <Text size="14px">{allDemocratVotes.toLocaleString()}</Text>
                </Group>
                <Explanation/>
                <Group>
                    <Text size="14px">{allRepublicanVotes.toLocaleString()}</Text>
                    <Text fw="bold">{getPercentage([allDemocratVotes, allRepublicanVotes], allRepublicanVotes).toFixed()}%</Text>
                </Group>
            </Group>
        </Stack>
    )
}