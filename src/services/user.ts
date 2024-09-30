import axiosInstance from "./axiosInstance";

// 유저 정보 조회(사진+닉네임)
export const get_users = async () => {
  const response = await axiosInstance.get(`/v1/users`);
  return response.data;
};

// 유저 가입(기본정보수정)
export const put_users = async (
  nickname: string,
  metropolitanGovernmentId: number,
  profileImageName: string | null
) => {
  const response = await axiosInstance.put(`/v1/users`, {
    nickname: nickname,
    metropolitanGovernmentId: metropolitanGovernmentId,
    profileImageName: profileImageName,
  });
  return response.data;
};

// 유저 프로필 이미지 등록
export const post_users_image = async (formData: FormData) => {
  const resposne = await axiosInstance.post(`/v1/users/image`, formData);
  return resposne.data;
};

// 유저 가입 확인
export const get_is_registered = async () => {
  const response = await axiosInstance.get(`/v1/users/is-registered`);
  return response.data;
};
