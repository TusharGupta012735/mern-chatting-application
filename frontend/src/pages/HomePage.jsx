import React from "react";
import { Container, Box, Text, Tabs } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} fontFamily="Work sans" color="black">
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg={"white"}
        w="100%"
        p={4}
        borderRadius="lg"
        color="black"
        borderWidth="1px"
      >
        <Tabs.Root lazyMount unmountOnExit defaultValue="Login">
          <Tabs.List display="flex">
            <Tabs.Trigger
              value="Login"
              flex="1"
              justifyContent="center"
              _selected={{
                color: "black",
                boxShadow: "0 4px 0 black",
              }}
            >
              Login 
            </Tabs.Trigger>
            <Tabs.Trigger
              value="Signup"
              flex="1"
              justifyContent="center"
              _selected={{
                color: "black",
                boxShadow: "0 4px 0 black",
              }}
            >
              Signup
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="Login"><Login/></Tabs.Content>
          <Tabs.Content value="Signup"><Signup/></Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default HomePage;
