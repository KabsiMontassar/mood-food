import React, { useState } from 'react';
import {
  Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, useDisclosure, VStack, List,
  ListItem, Badge, HStack, Tooltip, Divider, NumberInput,
  NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const GestionRepas = () => {
  const [repas, setRepas] = useState([]);
  const [rechercheNom, setRechercheNom] = useState('');
  const [rechercheCalMin, setRechercheCalMin] = useState('');
  const [rechercheCalMax, setRechercheCalMax] = useState('');
  const [nouveauRepas, setNouveauRepas] = useState({ nom: '', ingredients: [], calories: 0 });
  const [ingredientInput, setIngredientInput] = useState('');
  const [editingIngredientIndex, setEditingIngredientIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openDrawerForEdit = (index) => {
    setNouveauRepas(repas[index]);
    setEditingIndex(index);
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
      if (editingIngredientIndex !== null) {
        // Editing an existing ingredient
        setNouveauRepas((prev) => {
          const updatedIngredients = [...prev.ingredients];
          updatedIngredients[editingIngredientIndex] = ingredientInput.trim();
          return { ...prev, ingredients: updatedIngredients };
        });
        setEditingIngredientIndex(null);
      } else {
        // Adding a new ingredient
        setNouveauRepas((prev) => ({
          ...prev,
          ingredients: [...prev.ingredients, ingredientInput.trim()],
        }));
      }
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

  const handleEditIngredient = (index) => {
    setIngredientInput(nouveauRepas.ingredients[index]);
    setEditingIngredientIndex(index);
  };

  const handleRemoveIngredient = (index) => {
    setNouveauRepas((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
    if (editingIngredientIndex === index) {
      setIngredientInput('');
      setEditingIngredientIndex(null);
    }
  };

  const repasFiltres = repas.filter((repas) => {
    const nomMatch = repas.nom.toLowerCase().includes(rechercheNom.toLowerCase());
    const calMinMatch = !rechercheCalMin || repas.calories >= rechercheCalMin;
    const calMaxMatch = !rechercheCalMax || repas.calories <= rechercheCalMax;
    return nomMatch && calMinMatch && calMaxMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(repasFiltres.length / itemsPerPage);
  const currentRepas = repasFiltres.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Box p={5} maxW="container.lg" mx="auto">
      <VStack spacing={4} mb={4} align="stretch">
        <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} shadow="sm">
          <HStack spacing={6} align="start" justify="space-between">
            <Box flex="1">
              <Text fontWeight="bold" mb={2}>Rechercher par nom</Text>
              <Input
                placeholder="Nom du repas"
                value={rechercheNom}
                onChange={(e) => setRechercheNom(e.target.value)}
                variant="filled"
                borderRadius="md"
                shadow="sm"
              />
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" mb={2}>Calories min</Text>
              <NumberInput
                value={rechercheCalMin}
                onChange={(value) => setRechercheCalMin(value)}
                min={0}
                variant="filled"
                borderRadius="md"
                shadow="sm"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" mb={2}>Calories max</Text>
              <NumberInput
                value={rechercheCalMax}
                onChange={(value) => setRechercheCalMax(value)}
                min={0}
                variant="filled"
                borderRadius="md"
                shadow="sm"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </HStack>
        </Box>
      </VStack>

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
          {currentRepas.map((repas, index) => (
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

      {/* Pagination Controls */}
      <HStack spacing={4} justify="center" mt={4}>
        <IconButton
          icon={<ArrowLeftIcon />}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          aria-label="Page précédente"
        />
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            colorScheme={currentPage === i + 1 ? "teal" : "gray"}
          >
            {i + 1}
          </Button>
        ))}
        <IconButton
          icon={<ArrowRightIcon />}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          aria-label="Page suivante"
        />
      </HStack>

      <Button
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
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{editingIndex !== null ? 'Modifier le Repas' : 'Ajouter un Repas'}</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4}>
              <Input
                placeholder="Nom du repas"
                value={nouveauRepas.nom}
                onChange={(e) => setNouveauRepas({ ...nouveauRepas, nom: e.target.value })}
              />
              <HStack>
                <Input
                  placeholder="Ajouter un ingrédient"
                  value={ingredientInput}
                  onChange={handleIngredientInputChange}
                  onKeyDown={handleIngredientInputKeyDown}
                />
                <Button onClick={handleAddIngredient}>
                  {editingIngredientIndex !== null ? 'Enregistrer' : 'Ajouter'}
                </Button>
              </HStack>
              <List spacing={1}>
                {nouveauRepas.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <HStack justify="space-between">
                      <Tooltip label={ingredient}>
                        <span>{ingredient}</span>
                      </Tooltip>
                      <HStack>
                        <IconButton
                          icon={<EditIcon />}
                          size="xs"
                          colorScheme="blue"
                          onClick={() => handleEditIngredient(index)}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          size="xs"
                          colorScheme="red"
                          onClick={() => handleRemoveIngredient(index)}
                        />
                      </HStack>
                    </HStack>
                  </ListItem>
                ))}
              </List>
              <NumberInput
                placeholder="Calories"
                value={nouveauRepas.calories}
                onChange={(value) => setNouveauRepas({ ...nouveauRepas, calories: parseInt(value) })}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button colorScheme="teal" onClick={ajouterRepas}>
              {editingIndex !== null ? 'Enregistrer les modifications' : 'Ajouter'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GestionRepas;
