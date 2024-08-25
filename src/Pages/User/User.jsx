import React, { useState, useEffect } from 'react';
import {
  Stack, useColorModeValue, InputGroup, InputLeftElement, Input, Table, Thead, Tbody, Tr, Th, Td, Avatar, Button, HStack, Text, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Drawer, DrawerBody, DrawerFooter,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, FormControl, FormLabel, Input as ChakraInput, Badge, Select
} from '@chakra-ui/react';
import UserDetailsModal from './UserDetailsModal';

import { SearchIcon } from '@chakra-ui/icons';

const User = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [drawerMode, setDrawerMode] = useState('add');
  const [roleFilter, setRoleFilter] = useState('');
  const itemsPerPage = 5;
  
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const openModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };
  useEffect(() => {
    const dummyUsers = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      email: `user${index + 1}@example.com`,
      nom: `Nom${index + 1}`,
      prenom: `Prenom${index + 1}`,
      address: `Address${index + 1}`,
      tel: `123-456-789${index}`,
      role: index % 3 === 0 ? 'Nutritionniste' : index % 3 === 1 ? 'Psychologue' : 'Client',
      Specialite: index % 3 !== 2 ? `Specialite${index + 1}` : null,
      Experience: index % 3 !== 2 ? `${index + 1} years` : null,
      Poids: index % 3 === 2 ? `Poids${index + 1}` : null,
      Taille: index % 3 === 2 ? `Taille${index + 1}` : null,
      Age: index % 3 === 2 ? `Age${index + 1}` : null,
      EtatFumeur: index % 3 === 2 ? `EtatFumeur${index + 1}` : null,
      DetailleFumeur: index % 3 === 2 ? `DetailleFumeur${index + 1}` : null,
      EtatAlcool: index % 3 === 2 ? `EtatAlcool${index + 1}` : null,
      DetailleAlcool: index % 3 === 2 ? `DetailleAlcool${index + 1}` : null

    }));
    setUsers(dummyUsers);
    setFilteredUsers(dummyUsers.slice(0, itemsPerPage));
  }, []);

  const fetchUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredUsers(filtered.slice(startIndex, endIndex));
  };

  useEffect(() => {
    setPage(1);
    fetchUsers();
  }, [searchTerm, roleFilter, users]);

  useEffect(() => {
    fetchUsers();
  }, [page]);

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

  const handleEdit = (user) => {
    setSelectedUser(user);
    setDrawerMode('edit');
    onDrawerOpen();
  };

  const handleEditsave = () => {
    alert('Edit User functionality triggered.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Stack bgColor={useColorModeValue('gray.100', 'gray.700')} p={4} borderRadius={8} boxShadow="md" spacing={4}>
      <HStack mb={4} justify="space-between">
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
        <Select placeholder="Filter by Role" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="Nutritionniste">Nutritionniste</option>
          <option value="Psychologue">Psychologue</option>
          <option value="Client">Client</option>
        </Select>
        <Button colorScheme="green" onClick={() => {
          setDrawerMode('add');
          setSelectedUser(null);
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
            <Th>Nom</Th>
            <Th>Prenom</Th>
            <Th>Address</Th>
            <Th>Numero de telephone</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user, index) => (
            <Tr key={index}>
              <Td><Avatar bg='teal.500' name={`${user.nom} ${user.prenom}`} /></Td>
              <Td>{user.email}</Td>
              <Td>{user.nom}</Td>
              <Td>{user.prenom}</Td>
              <Td>{user.address}</Td>
              <Td>{user.tel}</Td>
              <Td>{user.role}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button colorScheme="teal" size="sm" onClick={() =>  openModal(user)}>
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
              <Td colSpan={8}>No users found.</Td>
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

      {selectedUser && (
        <UserDetailsModal isOpen={isOpen} onClose={closeModal} selectedUser={selectedUser} />
      )}

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{drawerMode === 'add' ? 'Add New User' : 'Edit User'}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <ChakraInput
                  type="email"
                  name="email"
                  value={selectedUser?.email || ''}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="nom">
                <FormLabel>Nom</FormLabel>
                <ChakraInput
                  type="text"
                  name="nom"
                  value={selectedUser?.nom || ''}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="prenom">
                <FormLabel>Prenom</FormLabel>
                <ChakraInput
                  type="text"
                  name="prenom"
                  value={selectedUser?.prenom || ''}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <ChakraInput
                  type="text"
                  name="address"
                  value={selectedUser?.address || ''}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="tel">
                <FormLabel>Numero de telephone</FormLabel>
                <ChakraInput
                  type="text"
                  name="tel"
                  value={selectedUser?.tel || ''}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  value={selectedUser?.role || ''}
                  onChange={handleInputChange}
                >
                  <option value="Nutritionniste">Nutritionniste</option>
                  <option value="Psychologue">Psychologue</option>
                  <option value="Client">Client</option>
                </Select>
              </FormControl>

              {selectedUser?.role !== 'Client' && (
                <>
                  <FormControl id="Specialite">
                    <FormLabel>Specialite</FormLabel>
                    <ChakraInput
                      type="text"
                      name="Specialite"
                      value={selectedUser?.Specialite || ''}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl id="Experience">
                    <FormLabel>Experience</FormLabel>
                    <ChakraInput
                      type="text"
                      name="Experience"
                      value={selectedUser?.Experience || ''}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </>
              )}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleEditsave}>{drawerMode === 'add' ? 'Add' : 'Save'}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default User;
