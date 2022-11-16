import {
  Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

function Lightbox({
  image, alt, children, ...props
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const img = getImage(image);
  return (
    <Box {...props}>
      <Box onClick={() => onOpen()} cursor="pointer">
        {children || (
          <Box as={GatsbyImage} image={img} alt={alt || 'default'} />
        )}
      </Box>
      <Modal isOpen={isOpen} isCentered size="full" onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="transparent" maxH="100vh">
          <ModalCloseButton color="white" w="60px" h="60px" size={60} zIndex={99} />
          <ModalBody p={0} display="flex" justifyContent="center" alignItems="center">
            <Box>
              <Box
                as={GatsbyImage}
                image={img}
                alt={alt || 'default'}
                objectFit="contain"
                maxH="100vh"
                w="auto"
                maxW="100vw"
                imgStyle={{
                  objectFit: 'contain',
                }}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Lightbox;
