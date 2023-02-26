import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanSpace from "./KanbanSpace";
import AddBox from "./AddBox";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Boxes } from "./boxes";
import React from "react";

export default function KanbanBoard() {
  const [todoItems, setTodoItems] = useState<Array<Boxes>>([]);
  const [doneItems, setDoneItems] = useState<Array<Boxes>>([]);
  const [inProgressItems, setInProgressItems] = useState<Array<Boxes>>([]);
  const [uItems, setuItems] = useState<Array<Boxes>>([]);
  const addNewCard = (title: string) => {
    setuItems([...uItems, { title }]);
  };
  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const title = e.active.data.current?.title ?? "";
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent ?? "ToDo";
        if (container === "ToDo") {
          setTodoItems([...todoItems, { title }]);
        } else if (container === "Done") {
          setDoneItems([...doneItems, { title }]);
        } else if (container === "Unassigned") {
          setuItems([...uItems, { title }]);
        } else {
          setInProgressItems([...inProgressItems, { title }]);
        }
        if (parent === "ToDo") {
          setTodoItems([
            ...todoItems.slice(0, index),
            ...todoItems.slice(index + 1),
          ]);
        } else if (parent === "Done") {
          setDoneItems([
            ...doneItems.slice(0, index),
            ...doneItems.slice(index + 1),
          ]);
        } else if (parent === "Unassigned") {
          setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
        } else {
          setInProgressItems([
            ...inProgressItems.slice(0, index),
            ...inProgressItems.slice(index + 1),
          ]);
        }
      }}
    >
      <Flex flexDirection="column">
        <AddBox addBox={addNewCard} />
        <Flex flex="3">
          <KanbanSpace title="ToDo" items={todoItems} />
          <KanbanSpace title="In Progress" items={inProgressItems} />
          <KanbanSpace title="Done" items={doneItems} />
          <KanbanSpace title="Unassigned" items={uItems} />
        </Flex>
      </Flex>
    </DndContext>
 );}