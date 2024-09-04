export type ServiceType = "google" | "naver" | "kakao";

export interface AuthService {
  service: ServiceType;
  label: string;
  url: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export const authServices: AuthService[] = [
  {
    service: "google",
    label: "구글 로그인",
    url: `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`,
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    borderColor: "#D3D3D3",
  },
  {
    service: "naver",
    label: "네이버 로그인",
    url: `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/naver`,
    backgroundColor: "#03C75A",
    textColor: "#FFFFFF",
    borderColor: "#03C75A",
  },
  {
    service: "kakao",
    label: "카카오 로그인",
    url: `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/kakao`,
    backgroundColor: "#FEE500",
    textColor: "#000000",
    borderColor: "#FEE500",
  },
];
