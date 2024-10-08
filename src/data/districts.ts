export const metropolitan_government = [
  { id: 1, name: "서울특별자치도", fullname: "서울특별차지도" },
  { id: 2, name: "부산광역시", fullname: "부산광역시" },
  { id: 3, name: "대구광역시", fullname: "대구광역시" },
  { id: 4, name: "인천광역시", fullname: "인천광역시" },
  { id: 5, name: "광주광역시", fullname: "광주광역시" },
  { id: 6, name: "대전광역시", fullname: "대전광역시" },
  { id: 7, name: "울산광역시", fullname: "울산광역시" },
  { id: 8, name: "세종특별자치시", fullname: "세종특별자치시" },
  { id: 9, name: "경기도", fullname: "경기도" },
  { id: 10, name: "강원특별자치도", fullname: "강원특별자치도" },
  { id: 11, name: "충청북도", fullname: "충청북도" },
  { id: 12, name: "충청남도", fullname: "충청남도" },
  { id: 13, name: "전북특별자치도", fullname: "전북특별자치도" },
  { id: 14, name: "전라남도", fullname: "전라남도" },
  { id: 15, name: "경상북도", fullname: "경상북도" },
  { id: 16, name: "경상남도", fullname: "경상남도" },
  { id: 17, name: "제주특별자치도", fullname: "제주특별자치도" },
];

export const local_government = [
  {
    metropolitanId: 1,
    districts: [
      { id: 1, name: "종로구", fullname: "서울특별자치도 종로구" },
      { id: 2, name: "중구", fullname: "서울특별자치도 중구" },
      { id: 3, name: "용산구", fullname: "서울특별자치도 용산구" },
      { id: 4, name: "성동구", fullname: "서울특별자치도 성동구" },
      { id: 5, name: "광진구", fullname: "서울특별자치도 광진구" },
      { id: 6, name: "동대문구", fullname: "서울특별자치도 동대문구" },
      { id: 7, name: "중랑구", fullname: "서울특별자치도 중랑구" },
      { id: 8, name: "성북구", fullname: "서울특별자치도 성북구" },
      { id: 9, name: "강북구", fullname: "서울특별자치도 강북구" },
      { id: 10, name: "도봉구", fullname: "서울특별자치도 도봉구" },
      { id: 11, name: "노원구", fullname: "서울특별자치도 노원구" },
      { id: 12, name: "은평구", fullname: "서울특별자치도 은평구" },
      { id: 13, name: "서대문구", fullname: "서울특별자치도 서대문구" },
      { id: 14, name: "마포구", fullname: "서울특별자치도 마포구" },
      { id: 15, name: "양천구", fullname: "서울특별자치도 양천구" },
      { id: 16, name: "강서구", fullname: "서울특별자치도 강서구" },
      { id: 17, name: "구로구", fullname: "서울특별자치도 구로구" },
      { id: 18, name: "금천구", fullname: "서울특별자치도 금천구" },
      { id: 19, name: "영등포구", fullname: "서울특별자치도 영등포구" },
      { id: 20, name: "동작구", fullname: "서울특별자치도 동작구" },
      { id: 21, name: "관악구", fullname: "서울특별자치도 관악구" },
      { id: 22, name: "서초구", fullname: "서울특별자치도 서초구" },
      { id: 23, name: "강남구", fullname: "서울특별자치도 강남구" },
      { id: 24, name: "송파구", fullname: "서울특별자치도 송파구" },
      { id: 25, name: "강동구", fullname: "서울특별자치도 강동구" },
    ],
  },
  {
    metropolitanId: 2,
    districts: [
      { id: 26, name: "중구", fullname: "부산광역시 중구" },
      { id: 27, name: "서구", fullname: "부산광역시 서구" },
      { id: 28, name: "동구", fullname: "부산광역시 동구" },
      { id: 29, name: "영도구", fullname: "부산광역시 영도구" },
      { id: 30, name: "부산진구", fullname: "부산광역시 부산진구" },
      { id: 31, name: "동래구", fullname: "부산광역시 동래구" },
      { id: 32, name: "남구", fullname: "부산광역시 남구" },
      { id: 33, name: "북구", fullname: "부산광역시 북구" },
      { id: 34, name: "해운대구", fullname: "부산광역시 해운대구" },
      { id: 35, name: "사하구", fullname: "부산광역시 사하구" },
      { id: 36, name: "금정구", fullname: "부산광역시 금정구" },
      { id: 37, name: "강서구", fullname: "부산광역시 강서구" },
      { id: 38, name: "연제구", fullname: "부산광역시 연제구" },
      { id: 39, name: "수영구", fullname: "부산광역시 수영구" },
      { id: 40, name: "사상구", fullname: "부산광역시 사상구" },
      { id: 41, name: "기장군", fullname: "부산광역시 기장군" },
    ],
  },
  {
    metropolitanId: 3,
    districts: [
      { id: 42, name: "중구", fullname: "대구광역시 중구" },
      { id: 43, name: "동구", fullname: "대구광역시 동구" },
      { id: 44, name: "서구", fullname: "대구광역시 서구" },
      { id: 45, name: "남구", fullname: "대구광역시 남구" },
      { id: 46, name: "북구", fullname: "대구광역시 북구" },
      { id: 47, name: "수성구", fullname: "대구광역시 수성구" },
      { id: 48, name: "달서구", fullname: "대구광역시 달서구" },
      { id: 49, name: "달성군", fullname: "대구광역시 달성군" },
      { id: 50, name: "군위군", fullname: "대구광역시 군위군" },
    ],
  },
  {
    metropolitanId: 4,
    districts: [
      { id: 51, name: "중구", fullname: "인천광역시 중구" },
      { id: 52, name: "동구", fullname: "인천광역시 동구" },
      { id: 53, name: "미추홀구", fullname: "인천광역시 미추홀구" },
      { id: 54, name: "연수구", fullname: "인천광역시 연수구" },
      { id: 55, name: "남동구", fullname: "인천광역시 남동구" },
      { id: 56, name: "부평구", fullname: "인천광역시 부평구" },
      { id: 57, name: "계양구", fullname: "인천광역시 계양구" },
      { id: 58, name: "서구", fullname: "인천광역시 서구" },
      { id: 59, name: "강화군", fullname: "인천광역시 강화군" },
      { id: 60, name: "옹진군", fullname: "인천광역시 옹진군" },
    ],
  },
  {
    metropolitanId: 5,
    districts: [
      { id: 61, name: "동구", fullname: "광주광역시 동구" },
      { id: 62, name: "서구", fullname: "광주광역시 서구" },
      { id: 63, name: "남구", fullname: "광주광역시 남구" },
      { id: 64, name: "북구", fullname: "광주광역시 북구" },
      { id: 65, name: "광산구", fullname: "광주광역시 광산구" },
    ],
  },
  {
    metropolitanId: 6,
    districts: [
      { id: 66, name: "동구", fullname: "대전광역시 동구" },
      { id: 67, name: "중구", fullname: "대전광역시 중구" },
      { id: 68, name: "서구", fullname: "대전광역시 서구" },
      { id: 69, name: "유성구", fullname: "대전광역시 유성구" },
      { id: 70, name: "대덕구", fullname: "대전광역시 대덕구" },
    ],
  },
  {
    metropolitanId: 7,
    districts: [
      { id: 71, name: "중구", fullname: "울산광역시 중구" },
      { id: 72, name: "남구", fullname: "울산광역시 남구" },
      { id: 73, name: "동구", fullname: "울산광역시 동구" },
      { id: 74, name: "북구", fullname: "울산광역시 북구" },
      { id: 75, name: "울주군", fullname: "울산광역시 울주군" },
    ],
  },
  {
    metropolitanId: 8,
    districts: [
      { id: 229, name: "세종특별자치시", fullname: "세종특별자치시" },
    ],
  },
  {
    metropolitanId: 9,
    districts: [
      { id: 76, name: "수원시", fullname: "경기도 수원시" },
      { id: 77, name: "고양시", fullname: "경기도 고양시" },
      { id: 78, name: "용인시", fullname: "경기도 용인시" },
      { id: 79, name: "성남시", fullname: "경기도 성남시" },
      { id: 80, name: "부천시", fullname: "경기도 부천시" },
      { id: 81, name: "안산시", fullname: "경기도 안산시" },
      { id: 82, name: "안양시", fullname: "경기도 안양시" },
      { id: 83, name: "남양주시", fullname: "경기도 남양주시" },
      { id: 84, name: "화성시", fullname: "경기도 화성시" },
      { id: 85, name: "평택시", fullname: "경기도 평택시" },
      { id: 86, name: "의정부시", fullname: "경기도 의정부시" },
      { id: 87, name: "파주시", fullname: "경기도 파주시" },
      { id: 88, name: "시흥시", fullname: "경기도 시흥시" },
      { id: 89, name: "김포시", fullname: "경기도 김포시" },
      { id: 90, name: "광명시", fullname: "경기도 광명시" },
      { id: 91, name: "광주시", fullname: "경기도 광주시" },
      { id: 92, name: "군포시", fullname: "경기도 군포시" },
      { id: 93, name: "하남시", fullname: "경기도 하남시" },
      { id: 94, name: "오산시", fullname: "경기도 오산시" },
      { id: 95, name: "이천시", fullname: "경기도 이천시" },
      { id: 96, name: "안성시", fullname: "경기도 안성시" },
      { id: 97, name: "의왕시", fullname: "경기도 의왕시" },
      { id: 98, name: "양주시", fullname: "경기도 양주시" },
      { id: 99, name: "구리시", fullname: "경기도 구리시" },
      { id: 100, name: "포천시", fullname: "경기도 포천시" },
      { id: 101, name: "여주시", fullname: "경기도 여주시" },
      { id: 102, name: "연천군", fullname: "경기도 연천군" },
      { id: 103, name: "가평군", fullname: "경기도 가평군" },
      { id: 104, name: "양평군", fullname: "경기도 양평군" },
      { id: 105, name: "동두천시", fullname: "경기도 동두천시" },
      { id: 106, name: "과천시", fullname: "경기도 과천시" },
    ],
  },
  {
    metropolitanId: 10,
    districts: [
      { id: 107, name: "춘천시", fullname: "강원특별자치도 춘천시" },
      { id: 108, name: "원주시", fullname: "강원특별자치도 원주시" },
      { id: 109, name: "강릉시", fullname: "강원특별자치도 강릉시" },
      { id: 110, name: "동해시", fullname: "강원특별자치도 동해시" },
      { id: 111, name: "태백시", fullname: "강원특별자치도 태백시" },
      { id: 112, name: "속초시", fullname: "강원특별자치도 속초시" },
      { id: 113, name: "삼척시", fullname: "강원특별자치도 삼척시" },
      { id: 114, name: "홍천군", fullname: "강원특별자치도 홍천군" },
      { id: 115, name: "횡성군", fullname: "강원특별자치도 횡성군" },
      { id: 116, name: "영월군", fullname: "강원특별자치도 영월군" },
      { id: 117, name: "평창군", fullname: "강원특별자치도 평창군" },
      { id: 118, name: "정선군", fullname: "강원특별자치도 정선군" },
      { id: 119, name: "철원군", fullname: "강원특별자치도 철원군" },
      { id: 120, name: "화천군", fullname: "강원특별자치도 화천군" },
      { id: 121, name: "양구군", fullname: "강원특별자치도 양구군" },
      { id: 122, name: "인제군", fullname: "강원특별자치도 인제군" },
      { id: 123, name: "고성군", fullname: "강원특별자치도 고성군" },
      { id: 124, name: "양양군", fullname: "강원특별자치도 양양군" },
    ],
  },
  {
    metropolitanId: 11,
    districts: [
      { id: 125, name: "청주시", fullname: "충청북도 청주시" },
      { id: 126, name: "충주시", fullname: "충청북도 충주시" },
      { id: 127, name: "제천시", fullname: "충청북도 제천시" },
      { id: 128, name: "보은군", fullname: "충청북도 보은군" },
      { id: 129, name: "옥천군", fullname: "충청북도 옥천군" },
      { id: 130, name: "영동군", fullname: "충청북도 영동군" },
      { id: 131, name: "증평군", fullname: "충청북도 증평군" },
      { id: 132, name: "진천군", fullname: "충청북도 진천군" },
      { id: 133, name: "괴산군", fullname: "충청북도 괴산군" },
      { id: 134, name: "음성군", fullname: "충청북도 음성군" },
      { id: 135, name: "단양군", fullname: "충청북도 단양군" },
    ],
  },
  {
    metropolitanId: 12,
    districts: [
      { id: 136, name: "천안시", fullname: "충청남도 천안시" },
      { id: 137, name: "공주시", fullname: "충청남도 공주시" },
      { id: 138, name: "보령시", fullname: "충청남도 보령시" },
      { id: 139, name: "아산시", fullname: "충청남도 아산시" },
      { id: 140, name: "서산시", fullname: "충청남도 서산시" },
      { id: 141, name: "논산시", fullname: "충청남도 논산시" },
      { id: 142, name: "계룡시", fullname: "충청남도 계룡시" },
      { id: 143, name: "당진시", fullname: "충청남도 당진시" },
      { id: 144, name: "금산군", fullname: "충청남도 금산군" },
      { id: 145, name: "부여군", fullname: "충청남도 부여군" },
      { id: 146, name: "서천군", fullname: "충청남도 서천군" },
      { id: 147, name: "청양군", fullname: "충청남도 청양군" },
      { id: 148, name: "홍성군", fullname: "충청남도 홍성군" },
      { id: 149, name: "예산군", fullname: "충청남도 예산군" },
      { id: 150, name: "태안군", fullname: "충청남도 태안군" },
    ],
  },
  {
    metropolitanId: 13,
    districts: [
      { id: 151, name: "전주시", fullname: "전북특별자치도 전주시" },
      { id: 152, name: "군산시", fullname: "전북특별자치도 군산시" },
      { id: 153, name: "익산시", fullname: "전북특별자치도 익산시" },
      { id: 154, name: "정읍시", fullname: "전북특별자치도 정읍시" },
      { id: 155, name: "남원시", fullname: "전북특별자치도 남원시" },
      { id: 156, name: "김제시", fullname: "전북특별자치도 김제시" },
      { id: 157, name: "완주군", fullname: "전북특별자치도 완주군" },
      { id: 158, name: "진안군", fullname: "전북특별자치도 진안군" },
      { id: 159, name: "무주군", fullname: "전북특별자치도 무주군" },
      { id: 160, name: "장수군", fullname: "전북특별자치도 장수군" },
      { id: 161, name: "임실군", fullname: "전북특별자치도 임실군" },
      { id: 162, name: "순창군", fullname: "전북특별자치도 순창군" },
      { id: 163, name: "고창군", fullname: "전북특별자치도 고창군" },
      { id: 164, name: "부안군", fullname: "전북특별자치도 부안군" },
    ],
  },
  {
    metropolitanId: 14,
    districts: [
      { id: 165, name: "목포시", fullname: "전라남도 목포시" },
      { id: 166, name: "여수시", fullname: "전라남도 여수시" },
      { id: 167, name: "순천시", fullname: "전라남도 순천시" },
      { id: 168, name: "나주시", fullname: "전라남도 나주시" },
      { id: 169, name: "광양시", fullname: "전라남도 광양시" },
      { id: 170, name: "담양군", fullname: "전라남도 담양군" },
      { id: 171, name: "곡성군", fullname: "전라남도 곡성군" },
      { id: 172, name: "구례군", fullname: "전라남도 구례군" },
      { id: 173, name: "고흥군", fullname: "전라남도 고흥군" },
      { id: 174, name: "보성군", fullname: "전라남도 보성군" },
      { id: 175, name: "화순군", fullname: "전라남도 화순군" },
      { id: 176, name: "장흥군", fullname: "전라남도 장흥군" },
      { id: 177, name: "강진군", fullname: "전라남도 강진군" },
      { id: 178, name: "해남군", fullname: "전라남도 해남군" },
      { id: 179, name: "영암군", fullname: "전라남도 영암군" },
      { id: 180, name: "무안군", fullname: "전라남도 무안군" },
      { id: 181, name: "함평군", fullname: "전라남도 함평군" },
      { id: 182, name: "영광군", fullname: "전라남도 영광군" },
      { id: 183, name: "장성군", fullname: "전라남도 장성군" },
      { id: 184, name: "완도군", fullname: "전라남도 완도군" },
      { id: 185, name: "진도군", fullname: "전라남도 진도군" },
      { id: 186, name: "신안군", fullname: "전라남도 신안군" },
    ],
  },
  {
    metropolitanId: 15,
    districts: [
      { id: 187, name: "포항시", fullname: "경상북도 포항시" },
      { id: 188, name: "경주시", fullname: "경상북도 경주시" },
      { id: 189, name: "김천시", fullname: "경상북도 김천시" },
      { id: 190, name: "안동시", fullname: "경상북도 안동시" },
      { id: 191, name: "구미시", fullname: "경상북도 구미시" },
      { id: 192, name: "영주시", fullname: "경상북도 영주시" },
      { id: 193, name: "영천시", fullname: "경상북도 영천시" },
      { id: 194, name: "상주시", fullname: "경상북도 상주시" },
      { id: 195, name: "문경시", fullname: "경상북도 문경시" },
      { id: 196, name: "경산시", fullname: "경상북도 경산시" },
      { id: 197, name: "군위군", fullname: "경상북도 군위군" },
      { id: 198, name: "의성군", fullname: "경상북도 의성군" },
      { id: 199, name: "청송군", fullname: "경상북도 청송군" },
      { id: 200, name: "영양군", fullname: "경상북도 영양군" },
      { id: 201, name: "영덕군", fullname: "경상북도 영덕군" },
      { id: 202, name: "청도군", fullname: "경상북도 청도군" },
      { id: 203, name: "고령군", fullname: "경상북도 고령군" },
      { id: 204, name: "성주군", fullname: "경상북도 성주군" },
      { id: 205, name: "칠곡군", fullname: "경상북도 칠곡군" },
      { id: 206, name: "예천군", fullname: "경상북도 예천군" },
      { id: 207, name: "봉화군", fullname: "경상북도 봉화군" },
      { id: 208, name: "울진군", fullname: "경상북도 울진군" },
      { id: 230, name: "울릉군", fullname: "경상북도 울릉군" },
    ],
  },
  {
    metropolitanId: 16,
    districts: [
      { id: 209, name: "창원시", fullname: "경상남도 창원시" },
      { id: 210, name: "진주시", fullname: "경상남도 진주시" },
      { id: 211, name: "통영시", fullname: "경상남도 통영시" },
      { id: 212, name: "사천시", fullname: "경상남도 사천시" },
      { id: 213, name: "김해시", fullname: "경상남도 김해시" },
      { id: 214, name: "밀양시", fullname: "경상남도 밀양시" },
      { id: 215, name: "거제시", fullname: "경상남도 거제시" },
      { id: 216, name: "양산시", fullname: "경상남도 양산시" },
      { id: 217, name: "의령군", fullname: "경상남도 의령군" },
      { id: 218, name: "함안군", fullname: "경상남도 함안군" },
      { id: 219, name: "창녕군", fullname: "경상남도 창녕군" },
      { id: 220, name: "고성군", fullname: "경상남도 고성군" },
      { id: 221, name: "남해군", fullname: "경상남도 남해군" },
      { id: 222, name: "하동군", fullname: "경상남도 하동군" },
      { id: 223, name: "산청군", fullname: "경상남도 산청군" },
      { id: 224, name: "함양군", fullname: "경상남도 함양군" },
      { id: 225, name: "거창군", fullname: "경상남도 거창군" },
      { id: 226, name: "합천군", fullname: "경상남도 합천군" },
    ],
  },
  {
    metropolitanId: 17,
    districts: [
      { id: 227, name: "제주시", fullname: "제주특별자치도 제주시" },
      { id: 228, name: "서귀포시", fullname: "제주특별자치도 서귀포시" },
    ],
  },
];
