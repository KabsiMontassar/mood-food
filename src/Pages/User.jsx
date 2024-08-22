import React, { useState, useEffect } from 'react';
import {
  Stack, useColorModeValue, InputGroup, InputLeftElement, Input, Table, Thead, Tbody, Tr, Th, Td, Avatar, Button, HStack, Text, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Drawer, DrawerBody, DrawerFooter,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, FormControl, FormLabel, Input as ChakraInput
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const User = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [drawerMode, setDrawerMode] = useState('add');
  const itemsPerPage = 5; 
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();








  
  const users = [
    { id: 1, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St', status: 'Active' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', address: '456 Elm St', status: 'Inactive' },
    { id: 3, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St', status: 'Active' },
    { id: 4, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', address: '456 Elm St', status: 'Inactive' },
    { id: 5, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St', status: 'Active' },
    { id: 6, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', address: '456 Elm St', status: 'Inactive' },
    { id: 7, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St', status: 'Active' },
    { id: 8, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', address: '456 Elm St', status: 'Inactive' },
    { id: 9, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St', status: 'Active' },
    { id: 10, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', address: '456 Elm St', status: 'Inactive' },
    { id: 11, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St', status: 'Active' },
    { id: 12, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', address: '456 Elm St', status: 'Inactive' },
    { id: 13, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St', status: 'Active' },
    { id: 14, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', address: '456 Elm St', status: 'Inactive' },
    { id: 15, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St', status: 'Active' },
    { id: 16, firstName: 'montassar', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', address: '456 Elm St', status: 'Inactive' },
   
  ];









  
  const fetchUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredUsers(filtered.slice(startIndex, endIndex));
  };

  useEffect(() => {
    setPage(1); 
    fetchUsers(); 
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers(); 
  }, [page ]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (filteredUsers.length === itemsPerPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleAdd = () => {
    alert('Add User functionality triggered.');
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setDrawerMode('edit');
    onDrawerOpen();
  
  };

  const handleEditsave = (user) => {
    alert('Edit User functionality triggered.');
  }


  return (
    <Stack bgColor={useColorModeValue('gray.100', 'gray.700')} p={4} borderRadius={8} boxShadow="md" spacing={4}>
      <HStack mb={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="green.300" />} />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            _focus={{ borderColor: 'green.300' }}
          />
        </InputGroup>
        <Button colorScheme="green" onClick={() => {
          setDrawerMode('add');
          onDrawerOpen();
        }}>
          Add User
        </Button>
      </HStack>
      <Table variant='striped' colorScheme='green'>
        <Thead>
          <Tr>
            <Th>Avatar</Th>
            <Th>Email</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Phone Number</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user, index) => (
            <Tr key={index}>
              <Td><Avatar bg='teal.500' name={`${user.firstName} ${user.lastName}`} /></Td>
              <Td>{user.email}</Td>
              <Td>{user.firstName}</Td>
              <Td>{user.lastName}</Td>
              <Td>{user.phoneNumber}</Td>
              <Td>{user.address}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button colorScheme="teal" size="sm" onClick={() => handleShowDetails(user)}>
                    Show Details
                  </Button>
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
          {filteredUsers.length === 0 && (
            <Tr>
              <Td colSpan={7}>No users found.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <HStack spacing={4} justify="center" mt={4}>
        <Button onClick={handlePreviousPage} isDisabled={page === 1}>
          Previous
        </Button>
        <Text>Page {page}</Text>
        <Button onClick={handleNextPage} isDisabled={filteredUsers.length < itemsPerPage}>
          Next
        </Button>
      </HStack>

      {/* Modal for showing user details */}
      {selectedUser && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text><strong>First Name:</strong> {selectedUser.firstName}</Text>
              <Text><strong>Last Name:</strong> {selectedUser.lastName}</Text>
              <Text><strong>Email:</strong> {selectedUser.email}</Text>
              <Text><strong>Phone Number:</strong> {selectedUser.phoneNumber}</Text>
              <Text><strong>Address:</strong> {selectedUser.address}</Text>
              <Text><strong>Status:</strong> {selectedUser.status}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Drawer for adding/editing user */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{drawerMode === 'add' ? 'Add New User' : 'Edit User'}</DrawerHeader>

          <DrawerBody>
            <FormControl id="firstName" mb={4}>
              <FormLabel>First Name</FormLabel>
              <ChakraInput placeholder="First Name" defaultValue={drawerMode === 'edit' ? selectedUser.firstName : ''} />
            </FormControl>
            <FormControl id="lastName" mb={4}>
              <FormLabel>Last Name</FormLabel>
              <ChakraInput placeholder="Last Name" defaultValue={drawerMode === 'edit' ? selectedUser.lastName : ''} />
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <ChakraInput placeholder="Email" defaultValue={drawerMode === 'edit' ? selectedUser.email : ''} />
            </FormControl>
            <FormControl id="phoneNumber" mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <ChakraInput placeholder="Phone Number" defaultValue={drawerMode === 'edit' ? selectedUser.phoneNumber : ''} />
            </FormControl>
            <FormControl id="address" mb={4}>
              <FormLabel>Address</FormLabel>
              <ChakraInput placeholder="Address" defaultValue={drawerMode === 'edit' ? selectedUser.address : ''} />
            </FormControl>
            <FormControl id="status" mb={4}>
              <FormLabel>Status</FormLabel>
              <ChakraInput placeholder="Status" defaultValue={drawerMode === 'edit' ? selectedUser.status : ''} />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={drawerMode === 'add' ? handleAdd : () => handleEditsave(selectedUser)}>
              {drawerMode === 'add' ? 'Add' : 'Save'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default User;
