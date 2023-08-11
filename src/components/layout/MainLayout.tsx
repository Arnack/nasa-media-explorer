import { Box, Container, Flex, Heading } from "@chakra-ui/react";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Container maxW="container.lg">
            <Flex flexDirection="column" minHeight="100vh">
                <Box as="header" p={4}>
                    <Heading as="h1" size="lg" color="white">
                        NASA Media Library
                    </Heading>
                </Box>

                <Box as="main" flex="1" p={4}>
                    {children}
                </Box>
            </Flex>
        </Container>
    );
};

export default MainLayout;
