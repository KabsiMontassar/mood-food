import React, { useState, useEffect } from 'react';
import {
  Stack, useColorModeValue, InputGroup, InputLeftElement, Input, Table, Thead, Tbody, Tr, Th, Td, Button, HStack, Text, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, IconButton, Select, Badge
} from '@chakra-ui/react';
import { SearchIcon, InfoOutlineIcon } from '@chakra-ui/icons';

const Commande = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); 
  const [filteredCommandes, setFilteredCommandes] = useState([]);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Updated placeholder data for commandes
  const commandes = [
    {
      id: 1,
      user  : 1,
      creationDate: '2024-08-01',
      products: [
        { id: 1, name: 'Product A', price: 10, quantity: 2 }, 
        { id: 2, name: 'Product B', price: 20, quantity: 1 }
      ],
      status: 'Pending'
    },
    {
      id: 2,
      user: 2,
      creationDate: '2024-08-02',
      products: [
        { id: 4, name: 'Product D', price: 15, quantity: 3 },
        { id: 5, name: 'Product E', price: 50, quantity: 1 }
      ],
      status: 'Completed'
    },
    {
      id: 3,
      user : 3,
      creationDate: '2024-08-03',
      products: [
        { id: 6, name: 'Product F', price: 8, quantity: 4 },
        { id: 7, name: 'Product G', price: 12, quantity: 2 }
      ],
      status: 'Pending'
    },
    // Other commandes...
  ];

  const fetchCommandes = () => {
    let filtered = commandes;

    if (searchTerm) {
      filtered = filtered.filter(commande =>
        commande.user.toString().includes(searchTerm) 
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(commande => commande.status === statusFilter);
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredCommandes(filtered.slice(startIndex, endIndex));
  };

  useEffect(() => {
    setPage(1);
    fetchCommandes();
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    fetchCommandes();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (filteredCommandes.length === itemsPerPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleShowDetails = (commande) => {
    setSelectedCommande(commande);
    onOpen();
  };

  const handleAccept = (commande) => {
    alert('Accept Commande functionality triggered.');
  };

  const handleDecline = (commande) => {
    alert('Decline Commande functionality triggered.');
  };

  const calculateTotalSum = (products) => {
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge variant='solid' colorScheme='green'>Completed</Badge>;
      case 'Pending':
        return <Badge variant='subtle' colorScheme='yellow'>Pending</Badge>;
      case 'Declined':
        return <Badge variant='outline' colorScheme='red'>Declined</Badge>;
      default:
        return <Badge variant='outline' colorScheme='gray'>Unknown</Badge>;
    }
  };

  return (
    <Stack bgColor={useColorModeValue('gray.100', 'gray.700')} p={4} borderRadius={8} boxShadow="md" spacing={4}>
      <HStack mb={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="green.300" />} />
          <Input
            type="text"
            placeholder="Search commandes by nom prenom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            _focus={{ borderColor: 'green.300' }}
          />
        </InputGroup>
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          maxW="200px"
          ml={4}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Declined">Declined</option>
        </Select>
      </HStack>
      <Table variant='striped' colorScheme='green'>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Creation Date</Th>
            <Th>Total Sum ($)</Th>
            <Th>Status</Th>
            <Th>Details</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredCommandes.map((commande, index) => (
            <Tr key={index}>
              <Td>{commande.user}</Td>
              <Td>{commande.creationDate}</Td>
              <Td>{calculateTotalSum(commande.products)}</Td>
              <Td>{getStatusBadge(commande.status)}</Td>
              <Td>
                <IconButton
                  aria-label="Show Details"
                  icon={<InfoOutlineIcon />}
                  onClick={() => handleShowDetails(commande)}
                  size="sm"
                  variant="outline"
                  colorScheme="blue"
                />
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button colorScheme="green" size="sm" onClick={() => handleAccept(commande)}>
                    ✔️ Accept
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDecline(commande)}>
                    ❌ Decline
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
          {filteredCommandes.length === 0 && (
            <Tr>
              <Td colSpan={6}>No commandes found.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <HStack spacing={4} justify="center" mt={4}>
        <Button onClick={handlePreviousPage} isDisabled={page === 1}>
          Previous
        </Button>
        <Text>Page {page}</Text>
        <Button onClick={handleNextPage} isDisabled={filteredCommandes.length < itemsPerPage}>
          Next
        </Button>
      </HStack>

      {/* Modal for showing commande details */}
      {selectedCommande && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Commande Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text><strong>User:</strong> {selectedCommande.user}</Text>
              <Text><strong>Creation Date:</strong> {selectedCommande.creationDate}</Text>
              <Text><strong>Total Sum:</strong> ${calculateTotalSum(selectedCommande.products)}</Text>
              <Text><strong>Status:</strong> {getStatusBadge(selectedCommande.status)}</Text>
              <Text mt={4}><strong>Products:</strong></Text>
              <ul>
                {selectedCommande.products.map(product => (
                  <li key={product.id}>
                    <Text>ID: {product.id}, Name: {product.name}, Price: ${product.price}, Quantity: {product.quantity}</Text>
                  </li>
                ))}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Stack>
  );
};

export default Commande;
