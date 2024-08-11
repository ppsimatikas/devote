import {useDisclosure} from '@mantine/hooks';
import {Group, Popover, Text} from '@mantine/core';
import {IconInfoCircleFilled} from "@tabler/icons-react";

export function Explanation() {
    const [opened, {close, open}] = useDisclosure(false);
    return (
        <Popover position="bottom" withArrow shadow="xl" opened={opened}>
            <Popover.Target>
                <Group align="center" gap={4}>
                    <IconInfoCircleFilled size={18} color="grey" />
                    <Text c="dimmed" size="16px" onMouseEnter={open} onMouseLeave={close}>
                        What is this?
                    </Text>
                </Group>
            </Popover.Target>
            <Popover.Dropdown style={{pointerEvents: 'none'}}>
                <Text fw="bold">Balance of power</Text>
                <Text>It takes 270 electoral votes to win the presidency.</Text>
                <Text>Each state carries a specific number of electoral votes.</Text>
            </Popover.Dropdown>
        </Popover>
    );
}