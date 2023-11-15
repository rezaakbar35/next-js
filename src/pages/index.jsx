import Wrapper from "@/components/Wrapper";
import { VStack, HStack, Box } from "@chakra-ui/react";
import { prisma } from "@/utils/prisma";
import Books from "../components/Books";
import Cookies from "js-cookie";

export default function Homepage(props) {
  return (
    <Wrapper>
      <>
        <VStack pt="70px">
          {props?.books
            ?.reduce((bookChunks, book, index) => {
              const chunkIndex = Math.floor(index / 4);

              if (!bookChunks[chunkIndex]) {
                bookChunks[chunkIndex] = [];
              }

              bookChunks[chunkIndex].push(book);

              return bookChunks;
            }, [])
            .map((bookChunk, chunkIndex) => (
              <HStack key={chunkIndex} pt="5px" spacing="100px">
                {bookChunk.map((book) => (
                  <Books key={`${book.id} ${book.title}`} {...book} />
                ))}
              </HStack>
            ))}
        </VStack>
        <Box
          position="fixed"
          sx={{
            width: "100%",
            pointerEvents: "none",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 88%, rgba(0, 0, 0, 0.10) 97%, rgba(0, 0, 0, 0.20) 100%)",
          }}
        ></Box>
      </>
    </Wrapper>
  );
}

// server side props ( fetch in server )

export async function getServerSideProps() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return {
      props: {
        books,
      },
    };
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
