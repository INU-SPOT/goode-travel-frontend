import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../services/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

// Notification data interface
interface NotificationData {
  id: number;
  postId: number;
  title: string;
  message: string;
  notificationTime: string;
  isConfirm: boolean;
}

interface NotificationBlockProps {
  onClose: () => void;
}

export default function NotificationBlock({ onClose }: NotificationBlockProps) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await axiosInstance.get("/v1/notification");
        const notifications = response.data.data;
        const sortedNotifications = notifications.sort(
          (a: NotificationData, b: NotificationData) =>
            Number(a.isConfirm) - Number(b.isConfirm)
        );
        setNotifications(sortedNotifications);
      } catch (err) {
        setError("알림이 없습니다.");
      }
    };

    loadNotifications();
  }, []);

  const handleNavigateWithQuery = (postId: number) => {
    const params = new URLSearchParams(location.search);
    params.set("postId", String(postId) || "");
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  };

  const handleNotificationClick = async (notification: NotificationData) => {
    try {
      // 확인 여부 변경
      await axiosInstance.patch(`/v1/notification/confirm/${notification.id}`);
      // 알림 확인 상태 변경
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notification.id ? { ...n, isConfirm: true } : n
        )
      );
      // postId를 query로 넘기기
      handleNavigateWithQuery(notification.postId);

      // 알림 시트 닫기
      onClose();
    } catch (err) {
      console.error("Error confirming notification", err);
    }
  };

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <NotificationWrapper>
      <Text>알림</Text>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
          >
            <NotificationType isConfirm={notification.isConfirm}>
              {notification.title}
            </NotificationType>
            <NotificationMessage isConfirm={notification.isConfirm}>
              "{notification.message}"
            </NotificationMessage>
            <NotificationTime>
              {new Date(notification.notificationTime).toLocaleString()}
            </NotificationTime>
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
  cursor: pointer;
`;

const NotificationType = styled.div<{ isConfirm: boolean }>`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${(props) =>
    props.isConfirm ? "#cccccc" : "#000000"}; /* 확인 여부에 따른 색상 변경 */
`;

const NotificationMessage = styled.div<{ isConfirm: boolean }>`
  font-size: 15px;
  margin-bottom: 8px;
  color: ${(props) => (props.isConfirm ? "#cccccc" : "#808080")};
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
  margin-top: 10px;
`;
