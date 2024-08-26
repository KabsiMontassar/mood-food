import React from 'react'
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

const FAQ = () => {

  const faq = [
    {
      question: 'Quels sont les moyens de paiement acceptés ?',
      answer: 'Nous acceptons les paiements par carte bancaire, PayPal, et virement bancaire. Pour les paiements en personne, nous acceptons également les espèces.',
    },
    {
      question: 'Comment puis-je suivre ma commande ?',
      answer: 'Vous pouvez suivre votre commande en utilisant le numéro de suivi fourni dans l\'email de confirmation d\'expédition. Vous pouvez également suivre l\'état de votre commande sur notre site web dans la section "Mon compte".',
    },
    {
      question: 'Quelle est votre politique de retour ?',
      answer: 'Nous offrons une politique de retour de 30 jours pour les articles non utilisés et dans leur emballage d\'origine. Pour initier un retour, veuillez contacter notre service client pour obtenir des instructions.',
    },
    {
      question: 'Comment puis-je contacter le service client ?',
      answer: 'Vous pouvez nous contacter par email à xxxxx ou par téléphone au 01 23 45 67 89. Nous sommes disponibles du lundi au vendredi, de 9h à 18h.',
    },
    {
      question: 'Livrez-vous à l\'international ?',
      answer: 'Oui, nous livrons dans le monde entier. Les frais de livraison varient en fonction de la destination et du poids de la commande. Veuillez consulter notre page de livraison pour plus d\'informations.',
    },
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Les délais de livraison varient en fonction de la destination et du mode de livraison choisi. Les commandes standard sont généralement livrées dans un délai de 3 à 5 jours ouvrables. Pour les commandes internationales, veuillez consulter notre page de livraison pour plus d\'informations.',
    },
    {
      question: 'Puis-je modifier ma commande après l\'avoir passée ?',
      answer: 'Malheureusement, nous ne pouvons pas modifier une commande une fois qu\'elle a été passée. Si vous avez besoin de modifier votre commande, veuillez contacter notre service client pour obtenir de l\'aide.',
    },
    {
      question: 'Offrez-vous des remises pour les commandes en gros ?',
      answer: 'Oui, nous offrons des remises pour les commandes en gros. Veuillez contacter notre service client pour obtenir un devis personnalisé.',
    }
  ]

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      p={8}
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VStack width="100%" maxW="container.lg" textAlign="center">
        <Box width="100%" position="sticky" top={0} bg={useColorModeValue('gray.100', 'gray.900')} zIndex={1} py={4}>
          <Heading as="h1" size="2xl">
            Foire aux Questions (FAQ)
          </Heading>
        </Box>
        <Box width="100%" overflowY="auto" maxH="calc(100vh - 100px)" p={4}>
          <Accordion allowToggle>
            {faq.map((item, index) => (
              <AccordionItem key={index} borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.600')}>
                <h2>
                  <AccordionButton _expanded={{ bg: useColorModeValue('gray.300', 'gray.700') }}>
                    <Box flex="1" textAlign="left" fontWeight="semibold" color={useColorModeValue('green.700', 'gray.300')
                    } fontSize="lg">
                      {item.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel textAlign="left" pb={4} fontSize="lg" >{item.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </VStack>
    </Box>
  )
}

export default FAQ
