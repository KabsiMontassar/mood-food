import React, { useState } from 'react';
import {
    Box,
    Text,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';

const EditPasswordForm = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Box maxW={{ base: '400px', md: 'full' }} minH={{ base: '400px', md: '510px' }}
        mx="auto" p={4} mt={5}  borderRadius="md">
            <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={4} textAlign="center">Change Password</Text>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter your current password"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="newPassword">New Password</FormLabel>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter your new password"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="Confirm your new password"
                        />
                    </FormControl>

                    <Button type="submit" width={{ base: '100%', md: '50%' }} colorScheme="teal" mt={4}>
                        Change Password
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default EditPasswordForm;
