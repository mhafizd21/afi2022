import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as LinkGatsby } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import Arrow from './Arrow';

const LinkStyled = styled(Link)`
  &:hover i{
    margin-left: 20px;
  }
`;
const wrapperColorOption = {
  garlic: 'garlic.500',
};

function LinkComponent({
  isExternal, children, iconColor, ...props
}) {
  return (
    <LinkStyled
      as={isExternal ? 'a' : LinkGatsby}
      letterSpacing=".5px"
      fontSize="20px"
      _hover={{
        textDecor: 'none',
      }}
      {...props}
    >
      {children}
      <Arrow
        dir="right"
        color={iconColor || 'dark'}
      />
    </LinkStyled>
  );
}

function ButtonLink({
  wrapped, wrapperColor = 'garlic', wrapperProps, ...props
}) {
  if (wrapped) {
    return (
      <Flex
        height={['max-content', null, '180px']}
        py={['15px', null, 0]}
        alignItems="center"
        justifyContent="center"
        border="2px solid #000000"
        borderY={[null, null, 'none']}
        borderRight={[null, null, 'none']}
        background={wrapperColorOption[wrapperColor] || wrapperColor}
        {...wrapperProps}
      >
        <LinkComponent {...props} />
      </Flex>
    );
  }
  return <LinkComponent {...props} />;
}
export default ButtonLink;
