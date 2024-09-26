import { useState, useEffect } from 'react';
import {
    Box,
    Text,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
} from '@chakra-ui/react';

const EditProfileForm = ({ data, onProfileUpdate }) => {
    const [formData, setFormData] = useState({
        username: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        // Populate form data when data prop changes
        if (data) {
            setFormData({
                username: data.username || '',
                dateOfBirth: data.birthDate || '',
                gender: data.gender || '',
                phone: data.phone || '',
                address: data.address || ''
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onProfileUpdate(formData); // Pass updated data to parent
    };

    return (
        <Box mx="auto" p={4} mt={5} borderRadius="md">
            <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={4} textAlign="center">Edit Profile</Text>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                        <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="gender">Gender</FormLabel>
                        <Select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value={formData.gender}>{formData.gender || 'Select your gender'}</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                           
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            type="tel"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        width={{ base: '100%', md: '50%' }}
                        colorScheme="teal"
                        mt={4}
                    >
                        Save Changes
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default EditProfileForm;
