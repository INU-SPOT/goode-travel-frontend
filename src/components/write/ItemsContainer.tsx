import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { TouchSensor, MouseSensor } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import useWriteStore from "../../store/useWriteStore";
import ItemContainer from "./ItemContainer";

export default function ItemsContainer() {
  const { ItemPosts, reorderItems } = useWriteStore();

  // 드래그 센서 설정: 터치와 마우스 모두 사용
  const sensors = useSensors(
    useSensor(MouseSensor), // 마우스를 위한 기본 센서
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0, // delayms 이상 터치 시 드래그
        tolerance: 5, // 터치 이동 허용량
      },
    })
  );

  // 항목이 드래그 후 드롭될 때 순서를 업데이트
  const onDragEnd = ({ active, over }: { active: any; over: any }) => {
    // active나 over가 null일 경우 처리하지 않음
    if (!active || !over) return;

    // 유효한 대상인지 확인 (드래그 도중 삭제된 경우 예외 처리)
    if (active.id === null || over.id === null) return;

    if (active.id !== over.id) {
      const oldIndex = ItemPosts.findIndex((item) => item.id === active.id);
      const newIndex = ItemPosts.findIndex((item) => item.id === over.id);

      // 삭제된 항목에 대한 예외 처리
      if (oldIndex === -1 || newIndex === -1) return;

      reorderItems(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors} // 설정한 센서 추가
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={ItemPosts} strategy={verticalListSortingStrategy}>
        <Container>
          {ItemPosts.length > 0 &&
            ItemPosts.map((item) => (
              <SortableItem key={item.id} id={item.id} title={item.title} />
            ))}
        </Container>
      </SortableContext>
    </DndContext>
  );
}

// SortableItem 컴포넌트 정의
function SortableItem({ id, title }: { id: number; title: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ItemContainer id={id} title={title} dragListeners={listeners} />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
