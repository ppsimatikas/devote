import React from 'react';
import {Anchor, Box, Button, Center, Container, Group, Image} from '@mantine/core';
import {Link, useLocation} from 'react-router-dom';
import styles from './Header.module.css';
import {gradient} from "../../theme";


function Header() {
    const location = useLocation();
    return (
        <Box component="header" className={styles.header}>
            <Container className={styles.container}>
                <Anchor component={Link} to="/" className={styles.logo}>
                    <Image src="logo.png" alt="Logo" width={60} height={60}/>
                </Anchor>
                <Center>
                    <Group>
                        <Button
                            component={Link}
                            to="/"
                            radius="xl"
                            variant={location.pathname === '/' ? "gradient" : undefined}
                            gradient={location.pathname === '/' ? gradient : undefined}
                            size="lg"
                        >
                            Vote
                        </Button>
                        <Button
                            component={Link}
                            to="/results"
                            radius="xl"
                            variant={location.pathname === '/results' ? "gradient" : undefined}
                            gradient={location.pathname === '/results' ? gradient : undefined}
                            size="lg"
                        >
                            Results
                        </Button>
                    </Group>
                </Center>
            </Container>
        </Box>
    );
}

export default Header;