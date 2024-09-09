import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sheet } from "react-modal-sheet";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TileClassNameFunc } from "react-calendar";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

type DatePiece = Date | null;
type TmpDate = DatePiece | [DatePiece, DatePiece];

export default function DateRangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tmpDate, setTmpDate] = useState<TmpDate>(null);
  const [selectedDate, setSelectedDate] = useState<TmpDate>(null);

  useEffect(() => {
    if (selectedDate instanceof Date) {
      if (tmpDate instanceof Date) {
        if (tmpDate < selectedDate) {
          setStartDate(tmpDate);
          setEndDate(selectedDate);
          setTmpDate(null);
        } else {
          setStartDate(selectedDate);
          setEndDate(tmpDate);
          setTmpDate(null);
        }
      } else {
        setStartDate(null);
        setEndDate(null);
        setTmpDate(selectedDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, setStartDate, setEndDate]);

  const tileClassName: TileClassNameFunc = ({ date, view }) => {
    if (view === "month") {
      const d = new Date(date);
      if (
        (tmpDate instanceof Date && sameDay(d, tmpDate)) ||
        (selectedDate instanceof Date && sameDay(d, selectedDate)) ||
        (startDate && sameDay(d, startDate)) ||
        (endDate && sameDay(d, endDate))
      ) {
        return "special-date";
      }
    }
    return null;
  };

  const sameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  return (
    <>
      <DateDisplay onClick={() => setIsOpen(true)}>
        {startDate && endDate
          ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
          : "언제 다녀오셨나요?"}
      </DateDisplay>
      <StyledSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <ContentWrapper>
              <h3>언제 다녀오셨나요?</h3>
              <Calendar
                onChange={setSelectedDate}
                calendarType="gregory" // 일요일 시작 설정
                formatDay={(_locale, date) => `${date.getDate()}`} // '일' 글자 제거
                tileClassName={tileClassName}
              />
              <TmpDateDisplayWrapper>
                <TmpDateDisplay>
                  <span>간 날</span>
                  {tmpDate instanceof Date || startDate ? (
                    <>
                      {tmpDate instanceof Date && (
                        <h4>{tmpDate.toLocaleDateString()}</h4>
                      )}
                      {startDate && <h4>{startDate.toLocaleDateString()}</h4>}
                    </>
                  ) : (
                    <h4>날짜를 선택해 주세요.</h4>
                  )}
                </TmpDateDisplay>
                <TmpDateDisplay>
                  <span>온 날</span>
                  {endDate ? (
                    <h4>{endDate.toLocaleDateString()}</h4>
                  ) : (
                    <h4>날짜를 선택해 주세요.</h4>
                  )}
                </TmpDateDisplay>
              </TmpDateDisplayWrapper>
              <ConfirmButton onClick={() => setIsOpen(false)}>
                확인
              </ConfirmButton>
            </ContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setIsOpen(false)} />
      </StyledSheet>
    </>
  );
}

const DateDisplay = styled.div`
  font-size: 14px;
  text-decoration: underline;
`;

const StyledSheet = styled(Sheet)`
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentWrapper = styled.div`
  padding: 0 16px 100px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow: auto;
  h3 {
    margin: 0;
  }
  .react-calendar {
    align-self: center;
    border: none;
    .react-calendar__navigation__arrow:focus {
      background-color: transparent;
    }
    .react-calendar__month-view__weekdays {
      abbr {
        text-decoration: none;
      }
    }
    .react-calendar__tile {
      margin: 2px 0;
      border-radius: 8px;
      font-size: 16px;
    }
    .react-calendar__tile--now {
      position: relative;
      background-color: #abe5e3;
    }
    .react-calendar__tile--now::before {
      position: absolute;
      top: -2px;
      left: 50%;
      transform: translateX(-50%);
      content: "오늘";
      font-size: 8px;
    }
    .special-date {
      background-color: #1087ff;
      color: white;
    }
  }
`;

const TmpDateDisplayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const TmpDateDisplay = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  span {
    font-size: 14px;
    color: #888888;
  }
  h4 {
    margin: 0;
  }
`;

const ConfirmButton = styled.button`
  position: fixed;
  bottom: 34px;
  width: 240px;
  height: 48px;
  background-color: #abe5e3;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: bold;
  left: 50%;
  transform: translateX(-50%);
`;
