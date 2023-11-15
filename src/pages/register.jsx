import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Flex,
    Input,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import Link from 'next/link'
import { registerUser } from "../modules/fetch";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  return (
    <VStack w="full" py={4} px={24} mx="auto" mt={6}>
      <Text fontSize="4xl" fontWeight="bold" pt={12}>
      Are you ready to get
      </Text>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
      rid of all your reads?
      </Text>

      <Flex py="24px" px={10} align="center" textAlign="center" >
        <form onSubmit={handleSubmit} >
          {error && (
            <Box color="red.500" mb={4}>
              {error}
            </Box>
          )}

          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input bg="white" type="name" w="20vw" name="name" placeholder="Enter your name" />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              bg="white" 
              w="20vw"
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              w="20vw"
              bg="white" 
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mt={4} mb={12}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              w="20vw"
              bg="white" 
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {password !== confirmPassword && (
              <Text fontSize="xs" color="red.500">
                The password does not match
              </Text>
            )}
          </FormControl>

          <Button type="submit" bg="#A2D2FF" borderRadius={50} px={10} my={1} _hover={{ bg: '#3E5F9C', color: "white" }} _active={{ border:'0px', color: "white" }}>
            Register
          </Button>
        </form>
      </Flex>
      <Text>
        Already have an account?
      </Text>
      <Link href='/login'>
          <Text>
            click here to login
          </Text>
        </Link>
    </VStack>
  );
};

export default Register;