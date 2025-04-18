import { Box, Flex, Heading } from "@radix-ui/themes";
import { ConnectButton } from "@mysten/dapp-kit";
import { HeroSection } from "./components/HeroSection";

function App() {
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
          zIndex: 100,
          background: "white"
        }}
      >
        <Box>
          <Heading>MOVE AUDIT</Heading>
        </Box>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <HeroSection />
    </>
  );
}

export default App;
