import React from 'react';
import {
    Box,
    Heading,
    HStack,
    Image,
    Icon,
    FormControl,
    Input,
} from '@chakra-ui/react';
import chefshat from '../../assets/chefs-hat.png';
import { Search2Icon } from '@chakra-ui/icons';
const SearchBar = ({ searchTerm, handleSearchChange }) => {
    return (
        <Box pt={3} px={{ base: 3, md: 6 }}>
            <Box p={{ base: 3, md: 6 }} border="2px solid rgba(228, 116, 102, .3)" bg="white" borderRadius="lg" >
                <HStack spacing={4}>
                    <Image src={chefshat} alt="chef's hat" boxSize={{ base: '40px', md: '50px' }}

                    />
                    <Heading size={{ base: 'md', md: 'lg' }}
                        color="orange.500" fontWeight="500">
                        Qu'est-ce que tu souhaites cuisiner?
                    </Heading>
                </HStack>

                <FormControl mt={4} display="flex" alignItems="center">
                    <Input
                        type="text"
                        placeholder="Rechercher une recette"
                        borderColor="rgba(228, 116, 102, .3)"
                        focusBorderColor="orange.600"
                        bg="white"
                        _placeholder={{ color: "gray.400" }}
                        size={{ base: 'md', md: 'lg' }}
                        borderRadius="md"
                        pr={10}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Icon
                        as={Search2Icon}
                        color="orange.400"
                        position="absolute"
                        right="10px"
                        cursor="pointer"
                    />
                </FormControl>
            </Box>
        </Box>

    )

}


export default SearchBar;