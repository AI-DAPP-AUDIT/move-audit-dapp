import { Box, Flex, Heading } from "@radix-ui/themes";
import { ConnectButton } from "@mysten/dapp-kit";

export function Header() {
  return (
    <Flex
      position="sticky"
      top="0"
      px="4"
      py="2"
      justify="between"
      align="center"
      style={{
        borderBottom: "1px solid var(--gray-a2)",
        background: "var(--color-background)",
        zIndex: 10,
      }}
    >
      <Box>
        <Flex align="center" gap="3">
          <img
            src="/logo.svg"
            alt="Move Audit Logo"
            style={{
              height: "32px",
              width: "auto",
            }}
          />
          <Heading>MOVE AUDIT</Heading>
        </Flex>
      </Box>
      <Box>
        <ConnectButton />
      </Box>
    </Flex>
  );
} 