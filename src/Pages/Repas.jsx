import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  HStack,
  List,
  ListItem,
  Badge,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Image,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const GestionRepas = () => {
  const [repas, setRepas] = useState([]);
  const [filters, setFilters] = useState({ nom: "", calMin: "", calMax: "" });
  const [nouveauRepas, setNouveauRepas] = useState({
    nom: "",
    ingredients: [],
    calories: "",
    fibre: "",
    carbohydrate: "",
    protein: "",
    lipids: "",
    imageUrl: "",
    imageFile: null,
  });
  const [ingredientInput, setIngredientInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Handle file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNouveauRepas({
        ...nouveauRepas,
        imageFile: file,
        imageUrl: URL.createObjectURL(file), // Creates a temporary URL for preview
      });
    }
  };

  const ajouterRepas = () => {
    if (nouveauRepas.nom.trim() === "" || nouveauRepas.ingredients.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (editingIndex !== null) {
      const repasMisAJour = repas.map((r, i) =>
        i === editingIndex ? nouveauRepas : r
      );
      setRepas(repasMisAJour);
      setEditingIndex(null);
    } else {
      setRepas([...repas, nouveauRepas]);
    }
    setNouveauRepas({
      nom: "",
      ingredients: [],
      calories: "",
      fibre: "",
      carbohydrate: "",
      protein: "",
      lipids: "",
      imageUrl: "",
      imageFile: null,
    });
    onClose();
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setNouveauRepas((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()],
      }));
      setIngredientInput("");
    }
  };

  const handleIngredientInputChange = (e) => {
    setIngredientInput(e.target.value);
  };

  const handleIngredientInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddIngredient();
    }
  };

  const repasFiltres = repas.filter((repas) => {
    const nomMatch = repas.nom.toLowerCase().includes(filters.nom.toLowerCase());
    const calMinMatch = !filters.calMin || repas.calories >= filters.calMin;
    const calMaxMatch = !filters.calMax || repas.calories <= filters.calMax;
    return nomMatch && calMinMatch && calMaxMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(repasFiltres.length / itemsPerPage);
  const currentRepas = repasFiltres.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box p={5} maxW="container.lg" mx="auto">
      {/* Filters Section */}
      <VStack spacing={4} mb={4} align="stretch">
        <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} shadow="sm">
          <HStack spacing={6} align="start" justify="space-between">
            <Box flex="1">
              <Input
                placeholder="Nom du repas"
                value={filters.nom}
                onChange={(e) => setFilters({ ...filters, nom: e.target.value })}
                variant="filled"
                borderRadius="md"
                shadow="sm"
              />
            </Box>
            <Box flex="1">
              <NumberInput
                value={filters.calMin}
                onChange={(value) => setFilters({ ...filters, calMin: value })}
                min={0}
                variant="filled"
                borderRadius="md"
                shadow="sm"
              >
                <NumberInputField placeholder="Calories min" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box flex="1">
              <NumberInput
                value={filters.calMax}
                onChange={(value) => setFilters({ ...filters, calMax: value })}
                min={0}
                variant="filled"
                borderRadius="md"
                shadow="sm"
              >
                <NumberInputField placeholder="Calories max" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </HStack>
        </Box>
      </VStack>

      {/* Table of Meals */}
      <Table variant="striped" colorScheme="teal" size="lg" shadow="md" borderRadius="lg" overflow="hidden">
        <Thead bg="teal.400">
          <Tr>
            <Th color="white" textAlign="center">Image</Th>
            <Th color="white" textAlign="center">Nom du Repas</Th>
            <Th color="white" textAlign="center">Ingrédients</Th>
            <Th color="white" textAlign="center">Calories</Th>
            <Th color="white" textAlign="center">Fibre (g)</Th>
            <Th color="white" textAlign="center">Carbohydrate (g)</Th>
            <Th color="white" textAlign="center">Protein (g)</Th>
            <Th color="white" textAlign="center">Lipids (g)</Th>
            <Th color="white" textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentRepas.map((repas, index) => (
            <Tr key={index} _hover={{ bg: "teal.50" }}>
              <Td textAlign="center">
                <Image
                  src={repas.imageUrl}
                  alt={repas.nom}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Td>
              <Td textAlign="center" fontWeight="bold">
                {repas.nom}
              </Td>
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
              <Td textAlign="center">{repas.fibre}</Td>
              <Td textAlign="center">{repas.carbohydrate}</Td>
              <Td textAlign="center">{repas.protein}</Td>
              <Td textAlign="center">{repas.lipids}</Td>
              <Td textAlign="center">
                <HStack spacing={2} justify="center">
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => {
                      setNouveauRepas(repas[index]);
                      setEditingIndex(index);
                      onOpen();
                    }}
                    aria-label="Modifier le repas"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => {
                      const repasMisAJour = repas.filter((_, i) => i !== index);
                      setRepas(repasMisAJour);
                    }}
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
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          aria-label="Page précédente"
        />
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            variant={i + 1 === currentPage ? "solid" : "outline"}
            colorScheme={i + 1 === currentPage ? "teal" : "gray"}
          >
            {i + 1}
          </Button>
        ))}
        <IconButton
          icon={<ArrowRightIcon />}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          aria-label="Page suivante"
        />
      </HStack>

      {/* Drawer for Adding/Editing a Meal */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{editingIndex !== null ? "Modifier le Repas" : "Ajouter un Repas"}</DrawerHeader>

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
                <Button onClick={handleAddIngredient}>Ajouter</Button>
              </HStack>
              <Box w="full">
                <List spacing={1}>
                  {nouveauRepas.ingredients.map((ingredient, index) => (
                    <ListItem key={index} w="full">
                      <HStack justify="space-between">
                        <Box>{ingredient}</Box>
                        <IconButton
                          icon={<DeleteIcon />}
                          size="sm"
                          onClick={() => {
                            setNouveauRepas({
                              ...nouveauRepas,
                              ingredients: nouveauRepas.ingredients.filter((_, i) => i !== index),
                            });
                          }}
                          aria-label="Supprimer l'ingrédient"
                        />
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <NumberInput
                value={nouveauRepas.calories}
                onChange={(value) => setNouveauRepas({ ...nouveauRepas, calories: value })}
                min={0}
              >
                <NumberInputField placeholder="Calories" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                value={nouveauRepas.fibre}
                onChange={(value) => setNouveauRepas({ ...nouveauRepas, fibre: value })}
                min={0}
              >
                <NumberInputField placeholder="Fibre (g)" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                value={nouveauRepas.carbohydrate}
                onChange={(value) => setNouveauRepas({ ...nouveauRepas, carbohydrate: value })}
                min={0}
              >
                <NumberInputField placeholder="Carbohydrate (g)" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                value={nouveauRepas.protein}
                onChange={(value) => setNouveauRepas({ ...nouveauRepas, protein: value })}
                min={0}
              >
                <NumberInputField placeholder="Protein (g)" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                value={nouveauRepas.lipids}
                onChange={(value) => setNouveauRepas({ ...nouveauRepas, lipids: value })}
                min={0}
              >
                <NumberInputField placeholder="Lipids (g)" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {nouveauRepas.imageUrl && (
                <Image src={nouveauRepas.imageUrl} alt="Aperçu" boxSize="150px" objectFit="cover" borderRadius="md" mt={2} />
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button colorScheme="teal" onClick={ajouterRepas}>
              {editingIndex !== null ? "Modifier" : "Ajouter"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={onOpen}
        mt={5}
      >
        Ajouter un Repas
      </Button>
    </Box>
  );
};

export default GestionRepas;
