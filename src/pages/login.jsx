import { useAuth } from "@/modules/context/authContext";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
  Spacer,
  Center,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { loginUser } from "../modules/fetch";
import { useRouter } from "next/router";
import Image from "next/image";
import login_bg from "../../public/image/login_bg.png";

const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const toast = useToast();
  const router = useRouter();
  return (
    <HStack justifyContent="start">
      <Image
        src={login_bg}
        sizes="100vh"
        style={{ left: 0, top: 0, position: "relative" }}
      />
      <Center>
      <VStack spacing={4} mt={4} px={20}>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="black"
          pb={20}
          px={10}
          align="center"
          style={{ wordWrap: "break-word" }}
        >
          Easiest way to arrange your reads in needs.
        </Text>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await loginUser(e.target.email.value, e.target.password.value);
              Cookies.set("isLoggedIn", true);
              setIsLoggedIn(true);
              router.push("/");
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <FormControl isRequired pb={10} px={10} w="20vw">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email address"
              bg="white"
            />
          </FormControl>
          <FormControl isRequired pb={10} px={10} w="20vw">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              bg="white"
            />
          </FormControl>
          <HStack>
            <Spacer />
            <Button
              type="submit"
              form="login-form"
              color="white"
              fontWeight="bold"
              bg="#A2D2FF"
              borderRadius={50}
              px={8}
              my={1}
              _hover={{ bg: "#3E5F9C" }}
              _active={{ border: "0px" }}
            >
              Login
            </Button>
            <Spacer />
          </HStack>
        </form>
        <Text pt={8}>Don't have an account?</Text>
        <Link href="/register">Click here to register</Link>
      </VStack>
      </Center>
    </HStack>
  );
};

export default LoginPage;
