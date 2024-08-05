import {Button, Card, Center, Group, Stack, Title} from "@mantine/core";
import {useCandidates} from "../data-access/contracts";
import {WorldIdConnect} from "../components/WorldIdConnect";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints";
import styles from './Home.module.css';
import {UiLoader} from "../components/loader";

function shuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function Home() {
    const { data: parties, isLoading } = useCandidates();

    const {isSm} = useUiBreakpoints();

    function renderCards() {
        if (!parties) {
            return null;
        }

        return shuffle(parties).map((p) => (
            <WorldIdConnect
                key={p.title}
                party={p}
                onSuccess={console.log} // callback when the modal is closed
            >
                <Card
                    className={styles.card}
                    bg={p.color}
                    w={!isSm ? "calc(50% - 15px)" : undefined}
                    c="white"
                    radius="lg"
                >
                    <Stack>
                        <Title>{p.title}</Title>
                        <img
                            src={p.image}
                            alt={p.title}
                            style={{height: '500px', objectFit: 'cover', width: '100%'}}
                        />
                        <Button size="xl" radius="md" variant="white" c={p.color}>Vote {p.title} Now !</Button>
                    </Stack>
                </Card>
            </WorldIdConnect>

        ))
    }

    return (
        <Stack>
            <Center>
                <h1>Vote for the 2024 U.S. elections</h1>
            </Center>
            {isLoading && <UiLoader/>}
            {
                isSm ?
                    <Stack gap="30px" hidden={!isSm}>
                        {renderCards()}
                    </Stack> :
                    <Group gap="30px" hidden={isSm}>
                        {renderCards()}
                    </Group>
            }
        </Stack>
    );
}

export default Home;
