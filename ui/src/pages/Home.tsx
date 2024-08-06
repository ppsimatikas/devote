import {Button, Card, Group, Stack, Title} from "@mantine/core";
import {useCandidates} from "../data-access/contracts";
import {WorldIdConnect} from "../components/WorldIdConnect";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints";
import styles from './Home.module.css';
import {UiLoader} from "../components/loader";
import {toastSuccess} from "../components/ui-toast";
import {shuffle} from "../utils/list";


function Home() {
    const { data: candidates, isLoading } = useCandidates();

    const {isSm} = useUiBreakpoints();

    function renderCards() {
        if (!candidates) {
            return null;
        }

        return shuffle(candidates).map((c) => (
            <WorldIdConnect
                key={c.title}
                candidate={c}
                onSuccess={() => toastSuccess("Thank you for voting in the 2024 US Elections!")}
            >
                <Card
                    className={styles.card}
                    bg={c.color}
                    w={!isSm ? "calc(50% - 15px)" : undefined}
                    c="white"
                    radius="lg"
                >
                    <Stack>
                        <Title ta="center">{c.title}</Title>
                        <img
                            src={c.image}
                            alt={c.title}
                            style={{height: '500px', objectFit: 'cover', width: '100%'}}
                        />
                        <Button size="xl" radius="md" variant="white" c={c.color}>Vote {c.title} Now !</Button>
                    </Stack>
                </Card>
            </WorldIdConnect>

        ))
    }

    return (
        <Stack>
            <Title ta="center" size={isSm ? "6vw" : "45px"}>Vote for the 2024 U.S. elections</Title>
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
