import { useState } from "react";
import styled from "styled-components";
import UserInfiniteScroll from "./UserInfiniteScroll";

export default function UserActivities() {
  const [activeTab, setActiveTab] = useState<"posts" | "likes" | "comments">(
    "posts"
  );

  return (
    <ActivitiesWrapper>
      <TitleWrapper>
        <Title
          $active={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        >
          작성글
        </Title>
        <Title
          $active={activeTab === "likes"}
          onClick={() => setActiveTab("likes")}
        >
          좋아요 한 글
        </Title>
        <Title
          $active={activeTab === "comments"}
          onClick={() => setActiveTab("comments")}
        >
          작성 댓글
        </Title>
      </TitleWrapper>

      <ContentWrapper>
        <TabContent $active={activeTab === "posts"}>
          <UserInfiniteScroll type="posts" isActive={activeTab === "posts"} />
        </TabContent>

        <TabContent $active={activeTab === "likes"}>
          <UserInfiniteScroll type="likes" isActive={activeTab === "likes"} />
        </TabContent>
        <TabContent $active={activeTab === "comments"}>
          <UserInfiniteScroll
            type="comments"
            isActive={activeTab === "comments"}
          />
        </TabContent>
      </ContentWrapper>
    </ActivitiesWrapper>
  );
}

const ActivitiesWrapper = styled.div``;

const TitleWrapper = styled.div`
  border-top: 1px solid #b1b1b1;
  height: 60px;
  display: flex;
  align-items: center;
  margin: 0 24px;
`;

const Title = styled.button<{ $active: boolean }>`
  font-size: 16px;
  flex: 1;
  text-align: center;
  cursor: pointer;
  background-color: white;
  color: ${({ $active }) => ($active ? "black" : "#545454")};
  font-weight: ${({ $active }) => ($active ? "bold" : "")};
  border: none;
`;

const ContentWrapper = styled.div``;

const TabContent = styled.div<{ $active: boolean }>`
  display: ${({ $active }) => ($active ? "block" : "none")};
`;
