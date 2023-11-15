import { createBook, editBook } from "@/modules/fetch";
import {
    Button,
    FormControl,
    FormLabel,
    Image,
    Flex,
    Input,
    useToast,
    VStack,
    Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        console.log(error);
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.log(error);
    }

  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(bookData?.image);
    }
  }, [bookData]);

  return (
    <VStack height="100vh" justifyContent="center" alignItems="center">
    <form onSubmit={handleSubmit} style={{ paddingTop: "100px" }}>
    <Box px={20} pt={20} pb={6} bg="white" mb={20} borderRadius={50}>
    <Flex justifyContent="space-between" alignItems="center">
    <VStack spacing={4} flex="1">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input name="title" required defaultValue={bookData?.title} />
      </FormControl>
      <FormControl>
        <FormLabel>Author</FormLabel>
        <Input name="author" required defaultValue={bookData?.author} />
      </FormControl>
      <FormControl>
        <FormLabel>Publisher</FormLabel>
        <Input name="publisher" required defaultValue={bookData?.publisher} />
      </FormControl>
      <FormControl>
        <FormLabel>Year</FormLabel>
        <Input
          name="year"
          type="number"
          required
          defaultValue={bookData?.year}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Pages</FormLabel>
        <Input
          name="pages"
          type="number"
          required
          defaultValue={bookData?.pages}
        />
      </FormControl>
      </VStack>
      <VStack spacing={4} flex="1">
    {selectedImage && (
      <Image w={64} h="100%" src={selectedImage} alt="Selected Image" ml={10}/>
    )}
    {!bookData?.image && (
      <FormControl style={{ 
        paddingLeft: "20px" 
        }}>
        <FormLabel
        >Image</FormLabel>
        <Input
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
          }}
        />
      </FormControl>
    )}
    </VStack>
  </Flex>
  <Button mt={14} type="submit">{bookData ? "Edit Book" : "Create Book"}</Button>
  </Box>
</form>
</VStack>
  );
}
