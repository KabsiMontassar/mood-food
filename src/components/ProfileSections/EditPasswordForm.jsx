import React, { useState } from 'react';
import {
    Box,
    Text,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

const EditPasswordForm = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation checks
        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                title: "Error.",
                description: "New password and confirmation do not match.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            // Get credentials for re-authentication
            const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);

            try {
                // Reauthenticate user
                await reauthenticateWithCredential(user, credential);
                
                // Update password
                await updatePassword(user, formData.newPassword);
                
                toast({
                    title: "Success!",
                    description: "Password updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                // Reset form data
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });

            } catch (error) {
                // Handle errors
                if (error.code === 'auth/wrong-password') {
                    toast({
                        title: "Error.",
                        description: "Current password is incorrect.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Error.",
                        description: "An error occurred while updating the password.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }
        } else {
            toast({
                title: "Error.",
                description: "No user is currently signed in.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box 
            mx="auto" p={4} mt={5} borderRadius="md">
            <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={4} textAlign="center">
                Change Password
            </Text>
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
