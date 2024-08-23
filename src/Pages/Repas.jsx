import React, { useState } from 'react';
import {
  Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, useDisclosure, VStack, List,
  ListItem, Badge, HStack, Tooltip, Divider
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const GestionRepas = () => {
  const [repas, setRepas] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [nouveauRepas, setNouveauRepas] = useState({ nom: '', ingredients: [], calories: 0 });
  const [ingredientInput, setIngredientInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingIngredientIndex, setEditingIngredientIndex] = useState(null);
  const [editedIngredient, setEditedIngredient] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const openDrawerForEdit = (index) => {
    setNouveauRepas(repas[index]);
    setEditingIndex(index);
    setEditingIngredientIndex(null);
    onOpen();
  };

  const ajouterRepas = () => {
    if (editingIndex !== null) {
      const repasMisAJour = repas.map((r, i) => (i === editingIndex ? nouveauRepas : r));
      setRepas(repasMisAJour);
      setEditingIndex(null);
    } else {
      setRepas([...repas, nouveauRepas]);
    }
    setNouveauRepas({ nom: '', ingredients: [], calories: 0 });
    onClose();
  };

  const mettreAJourRepas = (index) => {
    openDrawerForEdit(index);
  };

  const supprimerRepas = (index) => {
    const repasMisAJour = repas.filter((_, i) => i !== index);
    setRepas(repasMisAJour);
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setNouveauRepas((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()],
      }));
      setIngredientInput('');
    }
  };

  const handleIngredientInputChange = (e) => {
    setIngredientInput(e.target.value);
  };

  const handleIngredientInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (index) => {
    setNouveauRepas((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
    if (editingIngredientIndex !== null && editingIngredientIndex >= index) {
      setEditingIngredientIndex(null);
    }
  };

  const handleEditIngredient = (index) => {
    setEditedIngredient(nouveauRepas.ingredients[index]);
    setEditingIngredientIndex(index);
  };

  const handleSaveEditedIngredient = () => {
    if (editedIngredient.trim() !== '' && editingIngredientIndex !== null) {
      setNouveauRepas((prev) => ({
        ...prev,
        ingredients: prev.ingredients.map((ing, i) =>
          i === editingIngredientIndex ? editedIngredient.trim() : ing
        ),
      }));
      setEditedIngredient('');
      setEditingIngredientIndex(null);
    }
  };

  const repasFiltres = repas.filter((repas) =>
    repas.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <Box p={5} maxW="container.lg" mx="auto">
      <Input
        placeholder="Rechercher un repas"
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
            <Th color="white" textAlign="center">Nom du Repas</Th>
            <Th color="white" textAlign="center">Ingrédients</Th>
            <Th color="white" textAlign="center">Calories</Th>
            <Th color="white" textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {repasFiltres.map((repas, index) => (
            <Tr key={index} _hover={{ bg: "teal.50" }}>
              <Td textAlign="center" fontWeight="bold">{repas.nom}</Td>
              <Td textAlign="center">
                <List spacing={1} styleType="disc" textAlign="left">
                  {repas.ingredients.length > 0 ? (
                    repas.ingredients.map((ingredient, i) => (
                      <ListItem key={i}>{ingredient}</ListItem>
                    ))
                  ) : (
                    <ListItem>Aucun ingrédient</ListItem>
                  )}
                </List>
              </Td>
              <Td textAlign="center">
                <Badge colorScheme="green" fontSize="1em">
                  {repas.calories} kcal
                </Badge>
              </Td>
              <Td textAlign="center">
                <HStack spacing={4} justifyContent="center">
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => mettreAJourRepas(index)}
                    colorScheme="blue"
                    variant="outline"
                    aria-label="Modifier le repas"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => supprimerRepas(index)}
                    colorScheme="red"
                    variant="outline"
                    aria-label="Supprimer le repas"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Button
        ref={btnRef}
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={() => {
          setNouveauRepas({ nom: '', ingredients: [], calories: 0 });
          setEditingIndex(null);
          onOpen();
        }}
        mt={6}
        size="lg"
        shadow="md"
        borderRadius="full"
      >
        Ajouter un Repas
      </Button>

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
            {editingIndex !== null ? 'Modifier le Repas' : 'Ajouter un Nouveau Repas'}
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Nom du Repas"
                value={nouveauRepas.nom}
                onChange={(e) => setNouveauRepas({ ...nouveauRepas, nom: e.target.value })}
                variant="filled"
                borderRadius="lg"
              />
              <HStack spacing={3} align="center">
                <Input
                  placeholder="Ajouter un ingrédient"
                  value={ingredientInput}
                  onChange={handleIngredientInputChange}
                  onKeyDown={handleIngredientInputKeyDown}
                  variant="filled"
                  borderRadius="lg"
                  flex="1"
                />
                <Button
                  colorScheme="teal"
                  onClick={handleAddIngredient}
                  borderRadius="full"
                >
                  Ajouter
                </Button>
              </HStack>
              <Divider />
              <List spacing={2}>
                {nouveauRepas.ingredients.map((ingredient, index) => (
                  <HStack key={index} spacing={3} align="center">
                    <ListItem flex="1">{ingredient}</ListItem>
                    <Tooltip label="Éditer" aria-label="Edit">
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleEditIngredient(index)}
                        size="sm"
                        colorScheme="blue"
                      />
                    </Tooltip>
                    <Tooltip label="Supprimer" aria-label="Delete">
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleRemoveIngredient(index)}
                        size="sm"
                        colorScheme="red"
                      />
                    </Tooltip>
                  </HStack>
                ))}
              </List>
              {editingIngredientIndex !== null && (
                <HStack spacing={3} align="center">
                  <Input
                    placeholder="Modifier l'ingrédient"
                    value={editedIngredient}
                    onChange={(e) => setEditedIngredient(e.target.value)}
                    variant="filled"
                    borderRadius="lg"
                    flex="1"
                  />
                  <Button
                    colorScheme="teal"
                    onClick={handleSaveEditedIngredient}
                    borderRadius="full"
                  >
                    Enregistrer
                  </Button>
                </HStack>
              )}
              <Input
                placeholder="Calories"
                type="number"
                value={nouveauRepas.calories}
                onChange={(e) => setNouveauRepas({ ...nouveauRepas, calories: Number(e.target.value) })}
                variant="filled"
                borderRadius="lg"
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose} borderRadius="full">
              Annuler
            </Button>
            <Button colorScheme="teal" onClick={ajouterRepas} borderRadius="full">
              {editingIndex !== null ? 'Enregistrer les Modifications' : 'Enregistrer'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GestionRepas;
