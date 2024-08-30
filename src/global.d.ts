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
}

// 파일이 모듈로 인식되도록 export 빈 객체를 추가
export {};
