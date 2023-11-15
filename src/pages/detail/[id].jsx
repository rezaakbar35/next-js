import {
    Box,
    Button,
    Flex,
    Heading,
    VStack,
    
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Skeleton,
    Text,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import Wrapper from "@/components/Wrapper";
  import { useRouter } from "next/router";
  import Link from "next/link";
  import { deleteBook, getBookDetailById } from "@/modules/fetch";
  import { useAuth } from "@/modules/context/authContext";
  import { prisma } from "@/utils/prisma";
  import Image from "next/image";
  
  export default function BookDetails({ book }) {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
  
    const handleDeleteBook = async () => {
      try {
        await deleteBook(router.query.id);
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    };
  
    return (
      <Wrapper>
        <VStack height="100vh" justifyContent="center" alignItems="center">
        <Box px={20} pt={20} pb={20} bg="white" mb={20} borderRadius={50}>
        <Flex my="6">
          <Box w="300px">
            <Image src={`/uploads/${book.image.slice(9)}`} alt={book.title} width={300} height={400} />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
        {isLoggedIn && (
          <Flex justifyContent="space-between" >
            <Popover>
              <PopoverTrigger>
                <Button mx="2px" colorScheme="red" borderRadius="50px" >Delete</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete this book?
                </PopoverBody>
                <Button colorScheme="red" onClick={handleDeleteBook}>
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
            <Link href={`/edit/${router.query.id}`}>
              <Button variant="outline" ml="4" borderRadius="50px" borderColor="black">Edit</Button>
            </Link>
          </Flex>
        )}
        </Box>
        </VStack>
      </Wrapper>
    );
  }
  
  export async function getStaticPaths() {
    // get all books id
    const books = await prisma.book.findMany({
      select: {
        id: true,
      },
    });
    const paths = books.map((book) => ({
      params: { id: book.id.toString() },
    }));
    return {
      paths: paths,
      fallback: 'blocking',
    };
  }
  
  export async function getStaticProps(context) {
    try {
      const book = await prisma.book.findUnique({
        where: { id: Number(context.params.id) },
      });
      return {
        props: {
          book,
        },
        revalidate:10
      };
    } catch (e) {
      console.log(e);
      return {
        props: {},
      };
    }
  }