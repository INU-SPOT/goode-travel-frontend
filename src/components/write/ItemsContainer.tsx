import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import useItemPostsStore from "../../store/useItemPostsStore";
import ItemContainer from "./ItemContainer";

export default function ItemsContainer() {
  const { ItemPosts, updateContent, reorderItems, removeItemPost } =
    useItemPostsStore();

  // 항목이 드래그 후 드롭될 때 순서를 업데이트
  const onDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id !== over.id) {
      const oldIndex = ItemPosts.findIndex((item) => item.id === active.id);
      const newIndex = ItemPosts.findIndex((item) => item.id === over.id);

      reorderItems(oldIndex, newIndex);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={ItemPosts} strategy={verticalListSortingStrategy}>
        <Container>
          {ItemPosts.length > 0 &&
            ItemPosts.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                updateContent={updateContent}
                removeItemPost={removeItemPost}
              />
            ))}
        </Container>
      </SortableContext>
    </DndContext>
  );
}

// SortableItem 컴포넌트 정의
function SortableItem({
  id,
  title,
  content,
  updateContent,
  removeItemPost,
}: {
  id: number;
  title: string;
  content: string;
  updateContent: (id: number, content: string) => void;
  removeItemPost: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ItemContainer
        id={id}
        title={title}
        content={content}
        updateContent={updateContent}
        removeItemPost={removeItemPost}
        dragListeners={listeners} // Drag listeners를 ItemContainer에 전달
      />
    </div>
  );
}

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
