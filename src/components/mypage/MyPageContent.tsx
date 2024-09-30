import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as GearIcon } from "../../assets/icons/gear-icon.svg";
import { UserInfoResponse } from "../../types/user";
import { get_users } from "../../services/user";
import Settings from "./Settings";
import UserActivities from "./UserActivities";

export default function MyPageContent() {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    try {
      const response = await get_users();
      setUserInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Container>
      {userInfo ? (
        <>
          {showSettings ? (
            <Settings
              userInfo={userInfo}
              closeSetting={() => setShowSettings(false)}
              loadUser={loadUser}
            />
          ) : (
            <>
              <Profile>
                <div>
                  <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/${userInfo.profileImageName}`}
                    alt={`${userInfo.nickName} 프로필`}
                  />
                  <span>
                    <h3 className="nickname">{userInfo.nickName}님</h3>
                    <h3 className="metropolitan-government-name">
                      {userInfo.metropolitanGovernmentName}
                    </h3>
                  </span>
                </div>
                <GearIcon onClick={() => setShowSettings(true)} />
              </Profile>
              <UserActivities />
            </>
          )}
        </>
      ) : (
        <>
          <Settings
            isFirst={true}
            userInfo={{
              nickName: "",
              metropolitanGovernmentId: 1,
              metropolitanGovernmentName: "",
              profileImageName: "",
            }}
            closeSetting={() => setShowSettings(false)}
            loadUser={loadUser}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 24px;
  div {
    display: flex;
    gap: 16px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 100%;
    }
    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      h3 {
        margin: 0;
      }
      .nickname {
        font-size: 22px;
      }
      .metropolitan-government-name {
        font-size: 18px;
        color: #9c9c9c;
        font-weight: 400;
      }
    }
  }
  svg {
    width: 36px;
    height: 36px;
  }
`;
