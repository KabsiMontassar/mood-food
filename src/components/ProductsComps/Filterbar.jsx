import React from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  HStack,
  Heading,
  Image,
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
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import herbal from '../../assets/herbal.png';

const Filterbar = ({
  keywords,
  selectedKeyword, 
  setSelectedKeywords,
  handleClearFilters,
  searchTerm,
  handleSearchChange,
  priceSortOrder,
  handlePriceSortOrderChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleKeywordChange = (value) => {
    setSelectedKeywords(value);
  }

  return (
    <>
      <Box mb={7} p={{ base: 3, md: 6 }} className='recipe-element' bg="white">
        <Flex
          justifyContent={'space-between'}
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          textAlign={{ base: 'center', md: 'left' }}
          gap={4}
        >
          <HStack spacing={4}>
            <Image
              src={herbal}
              alt="chef's hat"
              boxSize={{ base: '40px', md: '50px' }}
            />
            <Heading size={{ base: 'md', md: 'lg' }} color="green.500" fontWeight="500">
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

              <Button colorScheme="green" onClick={onOpen} variant={'outline'}>
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
            <RadioGroup value={selectedKeyword} onChange={handleKeywordChange}>
              <Stack spacing={2}>
                {keywords.map((keyword) => (
                  <Radio key={keyword} value={keyword} colorScheme="green">
                    {keyword}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" w="100%" mr={3} onClick={handleClearFilters}>
              Clear Filters
            </Button>
           
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filterbar;
