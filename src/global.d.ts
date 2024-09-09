// 전역 타입 선언
declare global {
  interface Post {
    title: string;
    subTitles: string[];
    likes: number;
    comments: number;
    author: string;
    thumbnail: string;
  }
  interface Item {
    id: number;
    type: string;
    title: string;
    picture: string; // TODO: 장소 사진 타입 수정이 필요할 수도
    description: string;
    address: string;
    isOfficial: boolean;
  }
  interface ItemPost extends Item {
    content: string;
  }
}

// 파일이 모듈로 인식되도록 export 빈 객체를 추가
export {};
