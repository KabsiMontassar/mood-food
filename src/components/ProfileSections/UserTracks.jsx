import React, { useState } from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const UserTracks = ({ providedtime }) => {
  const [shown, setShown] = useState(0);

  return (
    <Box>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="space-between"
        p={3}
      >
        <IconButton
          boxSize={{ base: 6, md: 7 }}
          color="gray.500"
          bg="transparent"
          _hover={{ color: 'black', bg: 'transparent' }}
          icon={<ChevronLeftIcon />}
          onClick={() => {
            if (shown > 0) setShown(shown - 1);
          }}
        />
        <Text fontWeight="bold" color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
          {providedtime[shown]}
        </Text>
        <IconButton
          boxSize={{ base: 6, md: 7 }}
          color="gray.500"
          bg="transparent"
          _hover={{ color: 'black', bg: 'transparent' }}
          icon={<ChevronRightIcon />}
          onClick={() => {
            if (shown < providedtime.length - 1) setShown(shown + 1);
          }}
        />
      </Flex>

      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
        p={3}
        flexDirection="column"
        gap={2}
      >
        <Box p={5} w="100%">
          {[
            { label: 'Total Weight:', value: '75 kg' },
            { label: 'Muscle Mass:', value: '22.5 kg' },
            { label: 'Fat Mass:', value: '7.5 kg' },
            { label: 'Water Percentage:', value: '60%' },
          ].map((item, index) => (
            <Flex key={index} mb={2} gap={1}>
              <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }} color="black">
                {item.label}
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                {item.value}
              </Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default UserTracks;
