import { Flex, Text, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

export default function AddBox({
  addBox,
}: {
  addBox: (title: string) => void;
}) {
  const [title, setTitle] = useState<string>("");

  return (
    <Flex w="60%" p="5" alignItems="center">
      <Text flex="1" textAlign="center">
        Card Title
      </Text>
      <Input
        type="text"
        flex="4"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <Button
        flex="1"
        marginX="3"
        bgColor="red.400"
        color="white"
        onClick={() => {
          setTitle("");
          addBox(title);
        }}
      >
        Add Card
      </Button>
    </Flex>
  );
}