export interface Schedule {
  _id: number;
  title?: string; // 스케줄명
  content: string; // 내용
  year: string;
  month: string;
  week: string;
  dayOfTheWeek: DayOfTheWeek;
  day: string | null;
  startedTime: string; // "23:00"
  endedTime: string; // 끝 시간
  category: CategoryList;
  scheduleNote: string; // 비고
}

type CategoryList = "회사" | "취미" | "학교";

type DayOfTheWeek = "일" | "월" | "화" | "수" | "목" | "금" | "토";
