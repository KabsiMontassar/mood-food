import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";

const PlanComparison = () => {
    const plans = ["Free", "Premium"];
    const features = [
        { name: "Unlimited access to articles", free: true, premium: true },
        { name: "Ad-free experience", free: false, premium: true },
        { name: "Access to premium content", free: false, premium: true },
        { name: "Priority support", free: false, premium: true },
        { name: "Offline access", free: false, premium: true },
    ];

    return (
        <Flex
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        bg="green.900"
    >
        <Box color="white">
            <Heading as="h2" size="xl" textAlign="center" mb={8}>
                Free vs. Premium Plans
            </Heading>
            <Grid templateColumns="1fr 1fr 1fr" gap={4} alignItems="center">
                <Box></Box>
                {plans.map((plan) => (
                    <Box
                        key={plan}
                        bg="green.800"
                        p={4}
                        borderRadius="md"
                        textAlign="center"
                    >
                        <Text fontWeight="bold" fontSize="lg">
                            {plan}
                        </Text>
                    </Box>
                ))}
                {features.map((feature) => (
                    <React.Fragment key={feature.name}>
                        <Box p={4} borderBottom="1px solid rgba(255, 255, 255, 0.1)">
                            <Text fontSize="md">{feature.name}</Text>
                        </Box>
                        <Box
                            p={4}
                            textAlign="center"
                            borderBottom="1px solid rgba(255, 255, 255, 0.1)"
                        >
                            {feature.free ? (
                                <CheckIcon color="green.400" />
                            ) : (
                                <CloseIcon color="red.500" />
                            )}
                        </Box>
                        <Box
                            p={4}
                            textAlign="center"
                            borderBottom="1px solid rgba(255, 255, 255, 0.1)"
                        >
                            {feature.premium ? (
                                <CheckIcon color="green.400" />
                            ) : (
                                <CloseIcon color="red.500" />
                            )}
                        </Box>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>

    </Flex>
    );
};

export default PlanComparison;
