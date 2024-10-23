import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Select,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  FormControl,
  Icon,
  HStack,
  Heading,
  Image,

} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import herbal from '../../assets/herbal.png';

const Filterbar = ({
  keywords,
  selectedKeywords,
  handleKeywordChange,
  handleClearFilters,
  searchTerm,
  handleSearchChange,
  priceSortOrder,
  handlePriceSortOrderChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer controls

  return (
    <>

      <Box mb={7} p={{ base: 3, md: 6 }} className='recipe-element' bg="white">
        <Flex justifyContent={"space-between"} >
          <HStack spacing={4}>

            <Image src={herbal} alt="chef's hat" boxSize={{ base: '40px', md: '50px' }}

            />
            <Heading size={{ base: 'md', md: 'lg' }}
              color="green.500" fontWeight="500">
              Quel produit cherchez-vous?
            </Heading>


          </HStack>
          <HStack spacing={4}>

            <Flex>
              <Select
                focusBorderColor="green.600"
                value={priceSortOrder}
                onChange={handlePriceSortOrderChange}
                maxWidth="200px"
                mr={2}
              >
                <option value="ascending">Price: Low to High</option>
                <option value="descending">Price: High to Low</option>
              </Select>

              <Button  colorScheme="green" onClick={onOpen} variant={'outline'} >
                Filtrer
              </Button>
            </Flex>


          </HStack>
        </Flex>
        <FormControl mt={4} display="flex" alignItems="center">
          <Input
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}

            focusBorderColor="green.600"

            mb={{ base: 4, md: 0 }}
          />
          <Icon
            as={Search2Icon}
            color="green.400"
            position="absolute"
            right="10px"
            cursor="pointer"
          />
        </FormControl>

      </Box>




      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter by Keywords</DrawerHeader>

          <DrawerBody>
            <Stack spacing={2}>
              {keywords.map((keyword) => (
                <Checkbox
                  colorScheme="green"
                  key={keyword}
                  isChecked={selectedKeywords.includes(keyword)}
                  onChange={() => handleKeywordChange(keyword)}
                >
                  {keyword}
                </Checkbox>
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Button colorScheme="green" onClick={onClose}>
              Apply Filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filterbar;
