import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";

// 임시 알림 데이터
const mockNotifications = [
  {
    id: 1,
    type: "A님이 내 게시물에 댓글을 달았습니다.",
    message: "아 ㅋㅋ 이거 왜 이렇게 생김",
    time: "2024-09-10 12:00",
  },
  {
    id: 2,
    type: "B님이 당신의 게시글을 좋아합니다.",
    message: "인천 여행기",
    time: "2024-09-10 10:45",
  },
  {
    id: 3,
    type: "C님이 내 댓글에 대댓글을 달았습니다.",
    message: "아 이거 ㄹㅇ ㅇㅈ",
    time: "2024-09-10 10:00",
  },
];

// const fetchNotifications = async () => {
//   const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch notifications");
//   }
//   const data = await response.json();
//   return data;
// };

interface NotificationData {
  id: number;
  type: string;
  message: string;
  time: string;
}

export default function NotificationBlock() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API가 없으므로 임시 데이터를 사용
    const loadNotifications = async () => {
      try {
        // const data = await fetchNotifications();
        // setNotifications((prevNotifications) => [...data, ...prevNotifications]);

        // 임시 데이터로 대체
        setNotifications(mockNotifications);
      } catch (err) {
        setError("알림을 불러오는 중 오류가 발생했습니다.");
      }
    };

    loadNotifications();
  }, []);

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <NotificationWrapper>
      <Text>알림</Text>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationType>{notification.type}</NotificationType>
            <NotificationMessage>"{notification.message}"</NotificationMessage>
            <NotificationTime>{notification.time}</NotificationTime>
          </NotificationItem>
        ))
      ) : (
        <LoadingText>알림을 불러오는 중...</LoadingText>
      )}
    </NotificationWrapper>
  );
}

const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const NotificationWrapper = styled.div`
  width: 100%;
  padding: 25px;
  box-sizing: border-box;
`;

const NotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 0;
  border-bottom: 1px solid #cccccc;
  margin: 0;
`;

const NotificationType = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const NotificationMessage = styled.div`
  font-size: 15px;
  margin-bottom: 8px;
  color: #808080;
`;

const NotificationTime = styled.div`
  font-size: 12px;
  color: #cccccc;
`;

const LoadingText = styled.div`
  font-size: 14px;
`;

const ErrorText = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 10px;
`;
