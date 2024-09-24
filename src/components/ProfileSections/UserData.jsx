import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import UserTracks from './UserTracks';

const UserData = () => {
  const providedtime = [
    "Mon, 01/01/2021", "Tue, 02/01/2021", "Wed, 03/01/2021", "Thu, 04/01/2021",
    "Fri, 05/01/2021", "Sat, 06/01/2021", "Sun, 07/01/2021", "Mon, 08/01/2021",
    "Tue, 09/01/2021", "Wed, 10/01/2021", "Thu, 11/01/2021", "Fri, 12/01/2021",
    "Sat, 13/01/2021", "Sun, 14/01/2021"
  ];

  return (
  
      <Flex flexDirection="column" gap={6}
       alignItems="center" w="100%" justifyContent="center" p={5}>
      
        <UserTracks providedtime={providedtime} />
      </Flex>
   
  );
}

export default UserData;
