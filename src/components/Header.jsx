import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Link, LinkBox, List, Text,
  useDisclosure, useMediaQuery,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { graphql, Link as LinkGatsby, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import logo from '../images/logo.svg';
import logoMobile from '../images/logo-mobile.svg';

const slideDown = keyframes`
  0% { 
    opacity: 0;
    transform: translateY(-100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledListItem = styled.li`
  list-style: none;
  border-radius: 10px 10px 0 0;
  position: relative;
  height: max-content;
  padding: 25px 0;
  ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    perspective: 1000px;
    z-index: 2;
  }
  ${(p) => p.hasChild && (
    `
      &:hover {
        background-color: #FFFFFF;
        a {
          color: #000000;
        }
        ul {
          opacity: 1;
          top: 100%;
          width: max-content;
          li {
            display: block;
          }
        }
      }
      `
  )}
`;

const StyledListItemChild = styled.li`
  background-color: #FFFFFF;
  list-style: none;
  transform-origin: top center;
  animation: ${slideDown} 200ms ${(p) => +p.idx * 60}ms ease-in forwards;
  display: none;
  color: #FFFFFF;
  opacity: 0;
  border-bottom: 1px solid #000000;
  width: 100%;
  a {
    display: block;
    color: #000000;
    font-weight: 400;
    padding-right: 6px;
    font-size: 15px;
    white-space: pre-wrap;
    transition: .2s all ease-in-out;
    padding: 15px 25px;
    width: 100%;
    &:hover {
      text-decoration: none;
      color: var(--chakra-colors-brandPrimary-600);
      background: #eeefed;
    }
  }

`;

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMd] = useMediaQuery('(min-width: 768px)');

  const data = useStaticQuery(graphql`
    query NavbarQuery {
      cities: allMdx(sort: {fields: frontmatter___title, order: ASC}) {
        nodes {
          frontmatter {
            slug
            title
          }
          id
        }
      }
    }
  `);

  const navList = [
    {
      id: 1,
      text: 'Beranda',
      link: '/',
    },
    {
      id: 2,
      text: 'Tentang Program',
      link: '/about',
      children: [
        {
          id: 1,
          text: 'Apa dan Siapa',
          link: '/what',
        },
        {
          id: 2,
          text: 'Mengapa dan Bagaimana',
          link: '/how',
        },
      ],
    },
    {
      id: 3,
      text: 'Ekosistem Perfilman Lokal',
      link: '/ecosystem',
      children: data.cities.nodes.map((node) => ({
        id: node.id,
        text: node.frontmatter.title,
        link: `/${node.frontmatter.slug}`,
      })),
    },
    {
      id: 4,
      text: 'Tonton di Rangkai',
      link: 'https://rangkai.id/',
      external: true,
    },
    {
      id: 5,
      text: 'Hubungi',
      link: '/contact',
    },
  ];
  const navListNew = [
    {
      id: 1,
      text: 'Beranda',
      link: '/',
    },
    {
      id: 2,
      text: 'Program',
      link: '/about',
      children: [
        {
          id: 1,
          text: 'Apa dan Siapa',
          link: '/what',
        },
        {
          id: 2,
          text: 'Mengapa dan Bagaimana',
          link: '/how',
        },
      ],
    },
    {
      id: 3,
      text: 'Ekosistem',
      link: '/ecosystem',
      children: data.cities.nodes.map((node) => ({
        id: node.id,
        text: node.frontmatter.title,
        link: `/${node.frontmatter.slug}`,
      })),
    },
    {
      id: 4,
      text: 'RTL',
      link: '/',
      children: [
        {
          id: 1,
          text: '2022',
          link: '/',
        },
        {
          id: 2,
          text: '2023',
          link: '/',
        },
      ],
    },
    {
      id: 5,
      text: 'Semesta',
      link: '/',
    },
    {
      id: 6,
      text: 'Kemdikbud',
      link: '/',
      children: [
        {
          id: 1,
          text: 'Dana Indonesiana',
          link: '/',
        },
        {
          id: 2,
          text: 'Wirausaha Merdeka',
          link: '/',
        },
        {
          id: 3,
          text: 'Merdeka Belajar',
          link: '/',
        },
      ],
    },
    {
      id: 7,
      text: 'Kontak',
      link: '/contact',
    },
  ];

  if (true) {
    return (
      <Box
        as="header"
        py={['28px', null, '8px']}
        borderBottom="1px solid black"
        position="fixed"
        top={0}
        left={0}
        zIndex={2}
        w="100%"
        maxW="100vw"
        background="#FFFFFF"
      >
        <Container>
          <Flex alignItems="center" justifyContent={['space-between', null, 'flex-start']}>
            <LinkBox as={LinkGatsby} to="/" width={['130px', null, '300px']} minW={['130px', null, '300px']}>
              <Image
                src={logo}
                alt="afi_logo"
                width={300}
                height="auto"
                display={['none', null, 'block']}
              />
              <Image
                src={logoMobile}
                alt="afi_logo"
                width={100}
                height="auto"
                display={['block', null, 'none']}
              />
            </LinkBox>
            <Flex
              as="nav"
              justifyContent="flex-end"
              width="100%"
              display={['none', null, 'flex']}
            >
              <Flex
                as="ul"
              >
                {navListNew.map((item) => (
                  <StyledListItem
                    key={item.id}
                    hasChild={!!item.children?.length}
                  >
                    <Link
                      fontSize={16}
                      fontWeight={400}
                      letterSpacing=".5px"
                      px="20px"
                      display="block"
                      _hover={{
                        color: 'var(--chakra-colors-brandPrimary-600) !important',
                        textDecoration: 'none',
                      }}
                      to="/"
                    >
                      {item.text}
                    </Link>
                    {!!item.children?.length && (
                      <ul>
                        {item.children.map((child, i) => (
                          <StyledListItemChild key={child.id} idx={i + 1}>
                            <Link as={LinkGatsby} to={child.link}>
                              {child.text}
                            </Link>
                          </StyledListItemChild>
                        ))}
                      </ul>
                    )}
                  </StyledListItem>
                ))}
              </Flex>
            </Flex>
            <Button
              onClick={onOpen}
              variant="ghost"
              colorScheme="gray"
              p="2px"
              height="max-content"
              display={['block', null, 'none']}
              id="buttonMenu"
              minH="unset"
              aria-label="buttonMenu"
            >
              <HamburgerIcon w="30px" h="30px" />
            </Button>
          </Flex>
        </Container>
        {!isMd && (
          <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton color="#000000" opacity="0.5" />
              <DrawerHeader pt="16px">
                <Image
                  src={logo}
                  alt="afi_logo"
                  width={250}
                  height="auto"
                />
              </DrawerHeader>
              <DrawerBody p="16px">
                <Box
                  as="ul"
                  pb="20px"
                >
                  {navListNew.map((nav) => (
                    <Box as="li" my="5px" listStyleType="none" key={nav.id}>
                      <Link
                        as={LinkGatsby}
                        to={nav.link}
                        target={nav?.external ? '_blank' : ''}
                        p="5px 10px"
                        color="brandPrimary.500"
                        fontWeight="500"
                        display="block"
                      >
                        {nav.text}
                      </Link>
                      {!!nav.children?.length && (
                        <List boxShadow="0px 2px 16px rgba(0, 0, 0, 0.05)">
                          {nav.children.map((child) => (
                            <Box as="li" key={child.id} listStyleType="none">
                              <Link
                                as={LinkGatsby}
                                to={child.link}
                                target={child?.external ? '_blank' : ''}
                                p="10px"
                                pl="40px"
                                color="#0000000"
                                fontWeight="500"
                                display="block"
                                borderBottom="1px solid #000000"
                              >
                                {child.text}
                              </Link>
                            </Box>
                          ))}
                        </List>
                      )}
                    </Box>
                  ))}
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
      </Box>
    );
  }
  return (
    <Box as="header" mt={[null, '24px']} mb={[null, '48px']} py="12px">
      <Container>
        <Flex alignItems="center" justifyContent={['space-between', null, 'flex-start']}>
          <LinkBox as={LinkGatsby} to="/" width={['130px', null, '200px']} minW={['130px', null, '200px']}>
            <StaticImage
              src="../images/afi_logo.svg"
              alt="afi_logo"
              placeholder="blurred"
              quality={100}
            />
          </LinkBox>
          <Flex
            as="nav"
            justifyContent="flex-end"
            width="100%"
            display={['none', null, 'flex']}
          >
            <Flex
              as="ul"
              px="10px"
              borderBottom="2px solid"
              borderColor="brandRed.500"
              pb="20px"
            >
              {navList.map((nav) => (
                <StyledListItem
                  key={nav.id}
                  hasChild={!!nav.children?.length}
                >
                  <Link
                    as={nav.external ? 'a' : LinkGatsby}
                    to={nav.link}
                    href={nav.link}
                    color="brandBlue.500"
                    fontWeight="700"
                    p="10px"
                    display="block"
                    fontSize="15px"
                    _hover={{
                      color: 'var(--chakra-colors-brandRed-500) !important',
                      textDecoration: 'none',
                    }}
                    target={nav?.external ? '_blank' : ''}
                  >
                    {nav.text}
                  </Link>
                  {!!nav.children?.length && (
                    <ul>
                      {nav.children.map((child, i) => (
                        <StyledListItemChild key={child.id} idx={i + 1}>
                          <Link as={LinkGatsby} to={child.link}>
                            {child.text}
                          </Link>
                        </StyledListItemChild>
                      ))}
                    </ul>
                  )}
                </StyledListItem>
              ))}
            </Flex>
          </Flex>
          <Button
            onClick={onOpen}
            variant="ghost"
            colorScheme="gray"
            p="16px"
            height="max-content"
            display={['block', null, 'none']}
            id="buttonMenu"
            aria-label="buttonMenu"
          >
            <HamburgerIcon />
          </Button>
        </Flex>
      </Container>
      {!isMd && (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
          <DrawerOverlay />
          <DrawerContent maxW="calc(100vw - 12px)">
            <DrawerCloseButton color="brandRed.500" />
            <DrawerHeader pt="16px">
              <Text color="brandRed.500" fontWeight="700" fontSize="20px">
                Apresiasi Film Indonesia
              </Text>
            </DrawerHeader>
            <DrawerBody>
              <Box
                as="ul"
                borderBottom="2px solid"
                borderColor="brandRed.500"
                pb="20px"
              >
                {navList.map((nav) => (
                  <Box as="li" listStyleType="none" key={nav.id}>
                    <Link
                      as={LinkGatsby}
                      to={nav.link}
                      target={nav?.external ? '_blank' : ''}
                      p="10px"
                      color="brandRed.500"
                      fontWeight="600"
                      display="block"
                    >
                      {nav.text}
                    </Link>
                    {!!nav.children?.length && (
                      <ul>
                        {nav.children.map((child) => (
                          <Box key={child.id} listStyleType="none">
                            <Link
                              as={LinkGatsby}
                              to={child.link}
                              target={child?.external ? '_blank' : ''}
                              p="10px"
                              pl="25px"
                              color="brandBlue.500"
                              fontWeight="600"
                              display="block"
                            >
                              {child.text}
                            </Link>
                          </Box>
                        ))}
                      </ul>
                    )}
                  </Box>
                ))}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
}

export default Header;
