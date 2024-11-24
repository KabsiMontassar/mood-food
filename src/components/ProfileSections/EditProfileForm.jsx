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
    useToast    
} from '@chakra-ui/react';
import { collection, getDocs, query, updateDoc, where ,Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const EditProfileForm = ({ data, setData }) => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        username: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (data) {
            setFormData({
                username: data.display_name || '',
                dateOfBirth: data.birthdate 
                ? new Date(data.birthdate.seconds * 1000).toISOString().split('T')[0] 
                : '',
                gender: data.gender || '',
                phone: data.phone_number || '',
                address: data.adresse || ''
            });
        }
    }, [data]);


    const onProfileUpdate = async (updatedData) => {
        try {
            // Convert dateOfBirth to a Date object
            const birthdate = new Date(updatedData.dateOfBirth);
    
            if (isNaN(birthdate.getTime())) {
                toast({
                    title: "Invalid Date",
                    description: "Please provide a valid date.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
    
            const userQuery = query(collection(db, 'users'), where('email', '==', window.globalUserEmail));
            const querySnapshot = await getDocs(userQuery);
    
            if (!querySnapshot.empty) {
                await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        await updateDoc(doc.ref, {
                            display_name: updatedData.username,
                            birthdate: Timestamp.fromDate(birthdate), // Use the Date object here
                            gender: updatedData.gender,
                            phone_number: updatedData.phone,
                            adresse: updatedData.address,
                        });
                    })
                );
    
                toast({
                    title: "Profile updated",
                    description: "Your profile has been updated successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
    
                setData((prevData) => ({
                    ...prevData,
                    ...updatedData,
                    birthdate: { seconds: birthdate.getTime() / 1000 }, // Update local state as well
                }));
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                title: "Error",
                description: "There was an error updating your profile.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onProfileUpdate(formData);
    };

    // const URL = "https://docs.google.com/forms/d/e/1FAIpQLSeYxe80iDfQxobvly5fq6tYgosTMhAkJK26WenNSyulNfCSuw/viewform?usp=sf_link";

    // const handleFormRedirect = () => {
    //     window.open(URL, '_blank');
    //     toast({
    //         title: "Form Redirected",
    //         description: "You have been redirected to the Google Form.",
    //         status: "info",
    //         duration: 5000,
    //         isClosable: true,
    //     });
    // };

    return (
        <Box mx="auto" p={4} mt={5} borderRadius="md" boxShadow="md" bg="white">
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
                            <option value="">Select your gender</option>
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
                        // onClick={handleFormRedirect}
                        width="full"
                        colorScheme="teal"
                        mt={4}
                    >
                        Fill Out the Google Form
                    </Button>
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
