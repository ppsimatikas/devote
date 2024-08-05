import React from 'react';
import {Anchor, Box, Button, Container, Group} from '@mantine/core';
import {Link, useLocation} from 'react-router-dom';
import styles from './Header.module.css';
import {gradient} from "../../theme";
import {useUiBreakpoints} from "../../utils/use-ui-breakpoints";


function Header() {
    const location = useLocation();
    const {isSm} = useUiBreakpoints();
    const imageSize = 60;

    return (
        <Box component="header" className={styles.header}>
            <Container className={styles.container}>
                <Anchor component={Link} to="/" className={styles.logo}>
                    <img src="logo.png" alt="Logo" width={imageSize} height={imageSize}/>
                </Anchor>
                <Group justify={isSm ? "flex-end" : "center"}>
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
            </Container>
        </Box>
    );
}

export default Header;