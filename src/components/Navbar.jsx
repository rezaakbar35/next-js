import { useAuth } from "@/modules/context/authContext";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <Flex
    w="100%"
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    padding="0.5rem"
    bg="white"
    borderBottom="1px"
    borderColor="#C4C4C4"
    color="white"
    position="fixed"
    top="0"
    left="0"
    right="0"
    style={{ margin: '0' }}
    >
      <Link href="/">
      <div>
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="3xl" fontWeight="bold" color="#A2D2FF">
            Goodreads.
          </Text>
        </Flex>
        </div>
      </Link>
      <HStack>
        {isLoggedIn && (
          <Link href="/newbook">
            <Button bg="#A2D2FF" color="white" _hover={{ bg: '#3E5F9C' }} _active={{ border:'0px' }}borderRadius={25} px={10}>Create New Book</Button>
          </Link>
        )}
        {!isLoggedIn ? (
        <Link href="/login">
          <Button color="white" bg="#A2D2FF" borderRadius={50} px={8} my={1} _hover={{ bg: '#3E5F9C', borderColor: 'white' }} _active={{ border:'0px' }}>
            Login
          </Button>
          </Link>
        ) : (
          <Button
          bg="#EF476F" borderRadius={50} color="white" px={8} my={1} _hover={{ bg: '#D41240', borderColor: 'white'}} _active={{ border:'0px' }}
            onClick={() => {
              Cookies.remove("isLoggedIn");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;