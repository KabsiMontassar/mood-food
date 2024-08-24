import React, { useState } from 'react';
import {
  Box, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, useDisclosure, VStack, Badge, HStack,
  Select, Button
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

const GestionEquipement = () => {
  const initialEquipements = [
    { nom: 'Short de Course', quantite: 20, categorie: 'Vêtement', prix: 30, sousCategorie: 'Homme' },
    { nom: 'Tapis de Yoga', quantite: 15, categorie: 'Matériel', prix: 50, sousCategorie: '' },
    { nom: 'Bandes de Resistance Latex', quantite: 25, categorie: 'Matériel', prix: 30, sousCategorie: '' },
    { nom: 'Haltères', quantite: 10, categorie: 'Matériel', prix: 100, sousCategorie: '' },
    { nom: 'T-shirt de Sport', quantite: 50, categorie: 'Vêtement', prix: 20, sousCategorie: 'Homme' },
    { nom: 'Rameur', quantite: 5, categorie: 'Matériel', prix: 300, sousCategorie: '' },
    { nom: 'Legging de Yoga', quantite: 35, categorie: 'Vêtement', prix: 40, sousCategorie: 'Femme' },
    { nom: 'Ceinture de sudation', quantite: 20, categorie: 'Matériel', prix: 25, sousCategorie: '' },
    { nom: 'Chaussures de Running', quantite: 18, categorie: 'Vêtement', prix: 60, sousCategorie: 'Homme' },
    { nom: 'Kettlebell', quantite: 8, categorie: 'Matériel', prix: 80, sousCategorie: '' }
  ];

  const [equipements, setEquipements] = useState(initialEquipements);
  const [recherche, setRecherche] = useState('');
  const [nouvelEquipement, setNouvelEquipement] = useState({ nom: '', quantite: 0, categorie: '', prix: 0, sousCategorie: '' });
  const [categories] = useState(['Vêtement', 'Matériel']);
  const [sousCategories] = useState({ Vêtement: ['Homme', 'Femme'] });
  const [editingIndex, setEditingIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const openDrawerForEdit = (index) => {
    setNouvelEquipement(equipements[index]);
    setEditingIndex(index);
    onOpen();
  };

  const ajouterEquipement = () => {
    if (editingIndex !== null) {
      const equipementsMisAJour = equipements.map((e, i) => (i === editingIndex ? nouvelEquipement : e));
      setEquipements(equipementsMisAJour);
      setEditingIndex(null);
    } else {
      setEquipements([...equipements, nouvelEquipement]);
    }
    setNouvelEquipement({ nom: '', quantite: 0, categorie: '', prix: 0, sousCategorie: '' });
    onClose();
  };

  const mettreAJourEquipement = (index) => {
    openDrawerForEdit(index);
  };

  const supprimerEquipement = (index) => {
    const equipementsMisAJour = equipements.filter((_, i) => i !== index);
    setEquipements(equipementsMisAJour);
  };

  const handleCategoryChange = (e) => {
    const categorie = e.target.value;
    setNouvelEquipement(prev => ({
      ...prev,
      categorie,
      sousCategorie: categorie === 'Vêtement' ? prev.sousCategorie : ''
    }));
  };

  const handleSousCategorieChange = (e) => {
    setNouvelEquipement(prev => ({ ...prev, sousCategorie: e.target.value }));
  };

  const equipementsFiltres = equipements.filter((equipement) =>
    equipement.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  const paginatedEquipements = equipementsFiltres.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < equipementsFiltres.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextEquipement = () => {
    const nextIndex = editingIndex + 1;
    if (nextIndex < equipements.length) {
      openDrawerForEdit(nextIndex);
    }
  };

  return (
    <Box p={5} maxW="container.lg" mx="auto">
      <Input
        placeholder="Rechercher un équipement"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        mb={4}
        variant="filled"
        borderRadius="lg"
        shadow="sm"
      />

      <Table variant="striped" colorScheme="teal" size="lg" shadow="md" borderRadius="lg" overflow="hidden">
        <Thead bg="teal.400">
          <Tr>
            <Th color="white" textAlign="center">Nom</Th>
            <Th color="white" textAlign="center">Quantité</Th>
            <Th color="white" textAlign="center">Catégorie</Th>
            <Th color="white" textAlign="center">Prix</Th>
            <Th color="white" textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedEquipements.map((equipement, index) => (
            <Tr key={index} _hover={{ bg: "teal.50" }}>
              <Td textAlign="center" fontWeight="bold">{equipement.nom}</Td>
              <Td textAlign="center">{equipement.quantite}</Td>
              <Td textAlign="center">
                {equipement.categorie}
                {equipement.sousCategorie && ` - ${equipement.sousCategorie}`}
              </Td>
              <Td textAlign="center">
                <Badge colorScheme="green" fontSize="1em">
                  ${equipement.prix.toFixed(2)}
                </Badge>
              </Td>
              <Td textAlign="center">
                <HStack spacing={2} justifyContent="center">
                  <Button
                    leftIcon={<EditIcon />}
                    onClick={() => mettreAJourEquipement(index)}
                    colorScheme="blue"
                    variant="outline"
                    size="sm" 
                  >
                    Mettre à jour
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    onClick={() => supprimerEquipement(index)}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                  >
                    Supprimer
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      
      <HStack justifyContent="center" mt={4} spacing={4}>
        <IconButton
          onClick={handlePreviousPage}
          icon={<ArrowBackIcon />}
          colorScheme="teal"
          variant="outline"
          aria-label="Page précédente"
          size="sm"
          isDisabled={currentPage === 0}
        />
        <IconButton
          onClick={handleNextPage}
          icon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
          aria-label="Page suivante"
          size="sm"
          isDisabled={(currentPage + 1) * itemsPerPage >= equipementsFiltres.length}
        />
      </HStack>

      <IconButton
        ref={btnRef}
        icon={<AddIcon />}
        colorScheme="teal"
        onClick={() => {
          setNouvelEquipement({ nom: '', quantite: 0, categorie: '', prix: 0, sousCategorie: '' });
          setEditingIndex(null);
          onOpen();
        }}
        mt={6}
        size="lg"
        shadow="md"
        borderRadius="full"
        position="fixed"
        bottom={10}
        right={10}
        aria-label="Ajouter un équipement"
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent borderRadius="lg" maxW="md">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {editingIndex !== null ? 'Modifier l\'Équipement' : 'Ajouter un Équipement'}
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Nom de l'Équipement"
                value={nouvelEquipement.nom}
                onChange={(e) => setNouvelEquipement({ ...nouvelEquipement, nom: e.target.value })}
              />
              <Input
                placeholder="Quantité"
                type="number"
                value={nouvelEquipement.quantite}
                onChange={(e) => setNouvelEquipement({ ...nouvelEquipement, quantite: parseInt(e.target.value, 10) })}
              />
              <Select placeholder="Catégorie" value={nouvelEquipement.categorie} onChange={handleCategoryChange}>
                {categories.map((categorie) => (
                  <option key={categorie} value={categorie}>{categorie}</option>
                ))}
              </Select>
              {nouvelEquipement.categorie === 'Vêtement' && (
                <Select placeholder="Sous-catégorie" value={nouvelEquipement.sousCategorie} onChange={handleSousCategorieChange}>
                  {sousCategories[nouvelEquipement.categorie].map((sousCategorie) => (
                    <option key={sousCategorie} value={sousCategorie}>{sousCategorie}</option>
                  ))}
                </Select>
              )}
              <Input
                placeholder="Prix"
                type="number"
                value={nouvelEquipement.prix}
                onChange={(e) => setNouvelEquipement({ ...nouvelEquipement, prix: parseFloat(e.target.value) })}
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter justifyContent="space-between">
            <HStack>
              <Button variant="outline" mr={3} onClick={onClose}>
                Annuler
              </Button>
              <Button colorScheme="teal" onClick={ajouterEquipement}>
                {editingIndex !== null ? 'Enregistrer' : 'Ajouter'}
              </Button>
            </HStack>
            {editingIndex !== null && editingIndex < equipements.length - 1 && (
              <Button colorScheme="teal" onClick={handleNextEquipement}>
                Équipement suivant
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GestionEquipement;
