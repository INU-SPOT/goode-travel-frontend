import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FolderListResponse, FolderDetailResponse } from "../../types/folder";
import { get_folders_folderid } from "../../services/folder";
import image35 from "../../assets/images/image35.png";

interface FolderBlockProps {
  folder: FolderListResponse;
}

export default function FolderBlock({ folder }: FolderBlockProps) {
  const [completionRate, setCompletionRate] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletionRate = async () => {
      try {
        const folderDetail: FolderDetailResponse = await get_folders_folderid(
          folder.folderId
        );
        const planItems = folderDetail.itemFolders.filter(
          (item) => item.itemType === "PLAN"
        );
        const completedPlans = planItems.filter(
          (item) => item.isFinished
        ).length;
        const completionRate =
          planItems.length > 0 ? (completedPlans / planItems.length) * 100 : 0;
        setCompletionRate(completionRate);
      } catch (error) {
        console.error(`Error fetching folder details: ${error}`);
      }
    };

    fetchCompletionRate();
  }, [folder.folderId]);

  const handleNavigate = () => {
    navigate(`/save/${folder.folderId}`);
  };

  return (
    <BlockContainer onClick={handleNavigate}>
      <FolderImageContainer image={folder.image}>
        {!folder.image && <Placeholder />}
      </FolderImageContainer>
      <Footer>
        <FolderTitle>{folder.title}</FolderTitle>
        <CompletionRate>
          {completionRate !== undefined ? `${completionRate}%` : "Loading..."}
        </CompletionRate>
      </Footer>
    </BlockContainer>
  );
}

const BlockContainer = styled.div`
  width: 100%;
  padding: 0;
  border-radius: 13px;
  text-align: left;
  cursor: pointer;
  position: relative;
`;

const FolderImageContainer = styled.div<{ image: string | null }>`
  width: 100%;
  padding-top: 100%; /* 1:1 비율로 설정 */
  background-color: ${({ image }) => (image ? "transparent" : "#25292E")};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  border-radius: 13px;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #25292e;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
`;

const FolderTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #333;
  flex-grow: 1;
`;

const CompletionRate = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
  text-align: right;
`;
