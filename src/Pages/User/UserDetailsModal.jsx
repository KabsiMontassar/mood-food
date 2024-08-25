import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Avatar, Table, Tbody, Tr, Td, Flex } from "@chakra-ui/react";

const UserDetailsModal = ({ isOpen, onClose, selectedUser }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Flex justify="center" align="center" direction="column" mb={4}>
          <Avatar bg='teal.500' width="10vh" height="10vh"  name={`${selectedUser.nom} ${selectedUser.prenom}`} mb={4} /> 
        </Flex>

          
          <Table variant="simple" size="sm">
            <Tbody>
              <Tr>
                <Td><strong>Email:</strong></Td>
                <Td>{selectedUser.email}</Td>
              </Tr>
              <Tr>
                <Td><strong>Nom:</strong></Td>
                <Td>{selectedUser.nom}</Td>
              </Tr>
              <Tr>
                <Td><strong>Prenom:</strong></Td>
                <Td>{selectedUser.prenom}</Td>
              </Tr>
              <Tr>
                <Td><strong>Address:</strong></Td>
                <Td>{selectedUser.address}</Td>
              </Tr>
              <Tr>
                <Td><strong>Numero de telephone:</strong></Td>
                <Td>{selectedUser.tel}</Td>
              </Tr>
              <Tr>
                <Td><strong>Role:</strong></Td>
                <Td>{selectedUser.role}</Td>
              </Tr>
              {selectedUser.role !== "Client" && (
                <>
                  <Tr>
                    <Td><strong>Specialite:</strong></Td>
                    <Td>{selectedUser.Specialite}</Td>
                  </Tr>
                  <Tr>
                    <Td><strong>Experience:</strong></Td>
                    <Td>{selectedUser.Experience}</Td>
                  </Tr>
                </>
              )}
              {selectedUser.role === "Client" && (
                <>
                  <Tr>
                    <Td><strong>Poids:</strong></Td>
                    <Td>{selectedUser.Poids}</Td>
                  </Tr>
                  <Tr>
                    <Td><strong>Taille:</strong></Td>
                    <Td>{selectedUser.Taille}</Td>
                  </Tr>
                  <Tr>
                    <Td><strong>Age:</strong></Td>
                    <Td>{selectedUser.Age}</Td>
                  </Tr>
                  <Tr>
                    <Td><strong>Etat Fumeur:</strong></Td>
                    <Td>{selectedUser.EtatFumeur}</Td>
                  </Tr>
                  <Tr>
                    <Td><strong>Detaille Fumeur:</strong></Td>
                    <Td>{selectedUser.DetailleFumeur}</Td>
                  </Tr>
                  <Tr>
                    <Td><strong>Etat Alcool:</strong></Td>
                    <Td>{selectedUser.EtatAlcool}</Td>
                  </Tr>
                  <Tr>
                    <Td><strong>Detaille Alcool:</strong></Td>
                    <Td>{selectedUser.DetailleAlcool}</Td>
                  </Tr>
                </>
              )}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailsModal;
