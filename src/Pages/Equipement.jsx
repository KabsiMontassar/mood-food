import React, { useState } from 'react';
import {
  Box, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, useDisclosure, VStack, Badge, HStack,
  Select, Button, Image
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

const GestionProduit = () => {
  const initialProduits = [
    { nom: 'Short de Course', quantite: 20, categorie: 'Équipement Sportif', prix: 30, sousCategorie: 'Homme', populaire: true },
    { nom: 'Tapis de Yoga', quantite: 15, categorie: 'Équipement Sportif', prix: 50, sousCategorie: '', populaire: false },
    { nom: 'Bandes de Résistance Latex', quantite: 25, categorie: 'Équipement Sportif', prix: 30, sousCategorie: '', populaire: true },
    { nom: 'Haltères', quantite: 10, categorie: 'Équipement Sportif', prix: 100, sousCategorie: '', populaire: false },
    { nom: 'T-shirt de Sport', quantite: 50, categorie: 'Équipement Sportif', prix: 20, sousCategorie: 'Homme', populaire: false },
    { nom: 'Rameur', quantite: 5, categorie: 'Équipement Sportif', prix: 300, sousCategorie: '', populaire: true },
    { nom: 'Legging de Yoga', quantite: 35, categorie: 'Équipement Sportif', prix: 40, sousCategorie: 'Femme', populaire: true },
    { nom: 'Ceinture de sudation', quantite: 20, categorie: 'Équipement Sportif', prix: 25, sousCategorie: '', populaire: false },
    { nom: 'Chaussures de Running', quantite: 18, categorie: 'Équipement Sportif', prix: 60, sousCategorie: 'Homme', populaire: true },
    { nom: 'Kettlebell', quantite: 8, categorie: 'Équipement Sportif', prix: 80, sousCategorie: '', populaire: false },
    { nom: 'Whey Protein', quantite: 30, categorie: 'Compléments', prix: 60, sousCategorie: '', populaire: true },
    { nom: 'BCAA', quantite: 20, categorie: 'Compléments', prix: 40, sousCategorie: '', populaire: false },
    { nom: 'Omega 3', quantite: 25, categorie: 'Compléments', prix: 35, sousCategorie: '', populaire: true },
    { nom: 'Vitamines C', quantite: 40, categorie: 'Compléments', prix: 15, sousCategorie: '', populaire: false },
    { nom: 'Gainer', quantite: 15, categorie: 'Compléments', prix: 80, sousCategorie: '', populaire: true },
    { nom: 'Barres protéinées', quantite: 50, categorie: 'Produits Diététique', prix: 5, sousCategorie: '', populaire: true },
    { nom: 'Boisson Énergétique', quantite: 60, categorie: 'Produits Diététique', prix: 3, sousCategorie: '', populaire: false },
    { nom: 'Shaker', quantite: 35, categorie: 'Produits Diététique', prix: 10, sousCategorie: '', populaire: false },
    { nom: 'Lait d\'Amandes', quantite: 25, categorie: 'Produits Diététique', prix: 8, sousCategorie: '', populaire: false },
    { nom: 'Flocons d\'Avoine', quantite: 45, categorie: 'Produits Diététique', prix: 12, sousCategorie: '', populaire: true },]

  const [produits, setProduits] = useState(initialProduits);
  const [recherche, setRecherche] = useState('');
  const [nouveauProduit, setNouveauProduit] = useState({ nom: '', quantite: 0, categorie: '', sousCategorie: '', prix: 0, populaire: false, photo: null });
  const [categories] = useState({
    'Équipement Sportif': ['Vêtements', 'Matériel'],
    'Compléments': ['Protéines', 'Vitamines'],
    'Produits Diététique': ['Snacks', 'Boissons']
  });
  const [categorieFiltre, setCategorieFiltre] = useState('Tous');
  const [editingIndex, setEditingIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNouveauProduit({ ...nouveauProduit, photo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const openDrawerForEdit = (index) => {
    setNouveauProduit(produits[index]);
    setEditingIndex(index);
    onOpen();
  };

  const ajouterProduit = () => {
    if (editingIndex !== null) {
      const produitsMisAJour = produits.map((p, i) => (i === editingIndex ? nouveauProduit : p));
      setProduits(produitsMisAJour);
      setEditingIndex(null);
    } else {
      setProduits([...produits, nouveauProduit]);
    }
    setNouveauProduit({ nom: '', quantite: 0, categorie: '', sousCategorie: '', prix: 0, populaire: false, photo: null });
    onClose();
  };

  const supprimerProduit = (index) => {
    const produitsMisAJour = produits.filter((_, i) => i !== index);
    setProduits(produitsMisAJour);
  };

  const produitsFiltres = produits.filter((produit) =>
    (categorieFiltre === 'Tous' || produit.categorie === categorieFiltre) &&
    produit.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  const paginatedProduits = produitsFiltres.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < produitsFiltres.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box p={5} maxW="container.lg" mx="auto">
      {/* Filter and Search in the same row */}
      <HStack spacing={4} mb={4}>
        <Select
          placeholder="Filtrer par catégorie"
          value={categorieFiltre}
          onChange={(e) => setCategorieFiltre(e.target.value)}
          variant="filled"
          borderRadius="lg"
          shadow="sm"
        >
          <option value="Tous">Tous</option>
          {Object.keys(categories).map((categorie) => (
            <option key={categorie} value={categorie}>{categorie}</option>
          ))}
        </Select>

        <Input
          placeholder="Rechercher un produit"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          variant="filled"
          borderRadius="lg"
          shadow="sm"
        />
      </HStack>

      {/* Product table */}
      <Table variant="striped" colorScheme="teal" size="lg" shadow="md" borderRadius="lg" overflow="hidden">
        <Thead bg="teal.400">
          <Tr>
            <Th color="white" textAlign="center">Nom</Th>
            <Th color="white" textAlign="center">Quantité</Th>
            <Th color="white" textAlign="center">Catégorie</Th>
            <Th color="white" textAlign="center">Prix</Th>
            <Th color="white" textAlign="center">Photo</Th>
            <Th color="white" textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedProduits.map((produit, index) => (
            <Tr key={index} bg={produit.populaire ? 'yellow.100' : 'white'}>
              <Td textAlign="center" fontWeight="bold">{produit.nom}</Td>
              <Td textAlign="center">{produit.quantite}</Td>
              <Td textAlign="center">{`${produit.categorie} ${produit.sousCategorie ? `- ${produit.sousCategorie}` : ''}`}</Td>
              <Td textAlign="center">
                <Badge colorScheme="green" fontSize="1em">
                  ${produit.prix.toFixed(2)}
                </Badge>
              </Td>
              <Td textAlign="center">
                {produit.photo ? <Image src={produit.photo} boxSize="50px" objectFit="cover" borderRadius="md" /> : 'N/A'}
              </Td>
              <Td textAlign="center">
                <HStack spacing={2} justifyContent="center">
                  <Button
                    leftIcon={<EditIcon />}
                    onClick={() => openDrawerForEdit(index)}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                  >
                    Mettre à jour
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    onClick={() => supprimerProduit(index)}
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

      {/* Pagination */}
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
          isDisabled={(currentPage + 1) * itemsPerPage >= produitsFiltres.length}
        />
      </HStack>

      {/* Add product button */}
      <IconButton
        ref={btnRef}
        icon={<AddIcon />}
        colorScheme="teal"
        onClick={() => {
          setNouveauProduit({ nom: '', quantite: 0, categorie: '', sousCategorie: '', prix: 0, populaire: false, photo: null });
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
        aria-label="Ajouter un produit"
      />

      {/* Drawer for add/edit product */}
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
            {editingIndex !== null ? 'Modifier ' : 'Ajouter '}
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Nom du Produit"
                value={nouveauProduit.nom}
                onChange={(e) => setNouveauProduit({ ...nouveauProduit, nom: e.target.value })}
              />
              <Input
                placeholder="Quantité"
                type="number"
                value={nouveauProduit.quantite}
                onChange={(e) => setNouveauProduit({ ...nouveauProduit, quantite: parseInt(e.target.value, 10) })}
              />
              <Select
                placeholder="Sélectionner une catégorie"
                value={nouveauProduit.categorie}
                onChange={(e) => {
                  const selectedCategorie = e.target.value;
                  setNouveauProduit({
                    ...nouveauProduit,
                    categorie: selectedCategorie,
                    sousCategorie: categories[selectedCategorie][0] || '',
                  });
                }}
              >
                {Object.keys(categories).map((categorie) => (
                  <option key={categorie} value={categorie}>
                    {categorie}
                  </option>
                ))}
              </Select>

              <Select
                placeholder="Sélectionner une sous-catégorie"
                value={nouveauProduit.sousCategorie}
                onChange={(e) => setNouveauProduit({ ...nouveauProduit, sousCategorie: e.target.value })}
                isDisabled={!nouveauProduit.categorie}
              >
                {nouveauProduit.categorie &&
                  categories[nouveauProduit.categorie].map((sousCategorie) => (
                    <option key={sousCategorie} value={sousCategorie}>
                      {sousCategorie}
                    </option>
                  ))}
              </Select>

              <Input
                placeholder="Prix"
                type="number"
                value={nouveauProduit.prix}
                onChange={(e) => setNouveauProduit({ ...nouveauProduit, prix: parseFloat(e.target.value) })}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue" onClick={ajouterProduit}>
              {editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GestionProduit;
