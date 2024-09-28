export interface ItemCourseResponse {
  itemId: number;
  itemTitle: string;
  itemAddress: string;
}

export interface CourseDetailResponse {
  courseId: number;
  goodeId: number;
  goodeTitle: string;
  goodeMetropolitanGovernmentName: string;
  itemCourses: ItemCourseResponse[];
}
