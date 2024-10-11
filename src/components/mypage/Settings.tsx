import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera-icon.svg";
import { UserInfoResponse } from "../../types/user";
import { post_users_image, put_users } from "../../services/user";
import { metropolitan_government } from "../../data/districts";

export default function Settings({
  isFirst,
  userInfo,
  closeSetting,
  loadUser,
}: {
  isFirst?: boolean;
  userInfo: UserInfoResponse;
  closeSetting: () => void;
  loadUser: () => void;
}) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(userInfo.nickName);
  const [profileImage, setProfileImage] = useState(userInfo.profileImageName);
  const [metropolitanId, setMetropolitanId] = useState(
    userInfo.metropolitanGovernmentId
  );
  const [isSaving, setIsSaving] = useState(false); // 저장 중 상태
  const [isUploading, setIsUploading] = useState(false); // 업로드 중 상태

  useEffect(() => {
    if (isFirst) {
      setEditing(true);
    }
  }, [isFirst]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      setIsUploading(true); // 업로드 시작
      try {
        const response = await post_users_image(formData);
        const imageName = response.data;
        setProfileImage(imageName);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setIsUploading(false); // 업로드 완료
      }
    }
  };

  const handleSave = async () => {
    if (isSaving) return; // 중복 호출 방지
    setIsSaving(true); // 저장 시작
    try {
      if (profileImage === "") {
        await put_users(nickname, metropolitanId, null);
      } else {
        await put_users(nickname, metropolitanId, profileImage);
      }
      loadUser();
      setEditing(false);
    } catch (error) {
      console.error("저장 실패:", error);
    } finally {
      setIsSaving(false); // 저장 완료
    }
  };

  const handleCancel = () => {
    setNickname(userInfo.nickName);
    setProfileImage(userInfo.profileImageName);
    setMetropolitanId(userInfo.metropolitanGovernmentId);
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <Wrapper>
      {editing ? (
        <>
          <ImageWrapper>
            <img
              style={{ opacity: isUploading ? 0.4 : 1 }}
              src={`${process.env.REACT_APP_IMAGE_URL}/${profileImage}`}
              alt=""
            />
            <label htmlFor="upload">
              <StyledCameraIcon />
              <input
                type="file"
                id="upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                disabled={isUploading} // 업로드 중에는 비활성화
              />
            </label>
          </ImageWrapper>
          <EditFiledWrapper>
            <div>닉네임</div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </EditFiledWrapper>
          <EditFiledWrapper>
            <div>지역</div>
            <select
              value={metropolitanId}
              onChange={(e) => setMetropolitanId(Number(e.target.value))}
            >
              {metropolitan_government.map((gov, index) => (
                <option key={index} value={gov.id}>
                  {gov.name}
                </option>
              ))}
            </select>
          </EditFiledWrapper>
          <button onClick={handleSave} disabled={isSaving || isUploading}>
            {isSaving ? "저장 중..." : "완료"}
          </button>
          {!isFirst && (
            <button onClick={handleCancel} disabled={isSaving || isUploading}>
              취소
            </button>
          )}
        </>
      ) : (
        <>
          <StyledXIcon onClick={closeSetting} />
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/${userInfo.profileImageName}`}
            alt={`${userInfo.nickName} 프로필`}
          />
          <h3 className="nickname">{userInfo.nickName}님</h3>
          <h3 className="metropolitan-government-name">
            {userInfo.metropolitanGovernmentName}
          </h3>
          <button
            onClick={() => {
              setEditing(true);
            }}
          >
            정보 수정
          </button>
          <button onClick={handleLogout}>로그아웃</button>
          <span>
            <p>이용 약관</p>
            {/* <p>회원 탈퇴</p> // TODO: 회원 탈퇴는 일단 숨기기 */}
          </span>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin: 24px;
  position: relative;

  img {
    width: 200px;
    height: 200px;
    border-radius: 100%;
    position: relative;
  }

  h3 {
    margin: 0;
  }
  .nickname {
    font-size: 36px;
  }
  .metropolitan-government-name {
    font-size: 20px;
    color: #9c9c9c;
  }

  button {
    width: 160px;
    height: 56px;
    background-color: #e4f1e1;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    box-shadow: 0px 4px 4px 0px #00000040;
    font-weight: 400;
    font-size: 18px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 88px;

    p {
      margin: 0;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const StyledXIcon = styled(XIcon)`
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 100%;
  }
`;

const StyledCameraIcon = styled(CameraIcon)`
  width: 80px;
  height: 80px;
`;

const EditFiledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  div {
    font-weight: 700;
    font-size: 16px;
    min-width: 100px;
  }
  input {
    width: 200px;
    font-size: 16px;
    color: #8c8c8c;
  }
  select {
    width: 200px;
    font-size: 16px;
    color: #8c8c8c;
  }
`;
