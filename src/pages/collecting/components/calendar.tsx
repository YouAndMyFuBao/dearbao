import { useState } from "react";

interface CalendarProps {
  dataForDates?: Record<string, string>;
}

const Calendar: React.FC<CalendarProps> = ({ dataForDates }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDateState, setSelectedDateState] = useState<Date | null>();

  // 날짜 선택
  const handleDateClick = (date: Date) => {
    if (showModal) {
      setShowModal(false);
      console.log("모달창 닫기");
    }
    setSelectedDateState(date);
    setShowModal(true);
  };

  // 월 선택
  const handleMonthChange = (increment: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + increment,
      1
    );
    setCurrentDate(newDate);
    setSelectedDateState(null);
    setShowModal(false);
  };

  // 오늘로 이동
  const handleGoToToday = () => {
    setCurrentDate(new Date());
    setSelectedDateState(null);
    setShowModal(false);
  };

  // 날짜에 데이터가 있는지 확인
  const isDateWithData = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return Boolean(dataForDates?.[dateString]);
  };

  // 날짜 스타일 변경
  const getDateCellStyle = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isSelectedDate = selectedDateState
      ? date.toDateString() === selectedDateState.toDateString()
      : false;
    const isWithData = isDateWithData(date);

    return {
      backgroundColor: isWithData ? "lightblue" : "",
      color: isToday ? "green" : isSelectedDate ? "pink" : "black",
    };
  };

  // 달력 렌더링
  const renderCalendar = () => {
    const today = currentDate;
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).getDay();
    const calendar: JSX.Element[] = [];

    let dayCounter = 1;

    calendar.push(
      <tr key="header">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <th key={index}>{day}</th>
        ))}
      </tr>
    );

    for (let i = 0; i < 6; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        const dayDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          dayCounter
        );
        const isCurrentMonth =
          dayCounter <= daysInMonth && (i > 0 || j >= firstDayOfMonth);

        row.push(
          <td
            key={`${i}-${j}`}
            onClick={() => handleDateClick(dayDate)}
            style={isCurrentMonth ? getDateCellStyle(dayDate) : {}}
          >
            {isCurrentMonth ? dayCounter++ : ""}
          </td>
        );
      }
      calendar.push(<tr key={i}>{row}</tr>);
      if (dayCounter > daysInMonth) {
        break;
      }
    }

    return (
      <table>
        <thead>
          <tr>
            <th colSpan={7}>
              <button onClick={() => handleMonthChange(-1)}>이전 달</button>
              <button
                onClick={() => handleGoToToday()}
              >{` ${today.toLocaleString("default", { month: "long", year: "numeric" })} `}</button>
              <button onClick={() => handleMonthChange(1)}>다음 달</button>
            </th>
          </tr>
        </thead>
        <tbody>{calendar}</tbody>
      </table>
    );
  };

  return (
    <div>
      {renderCalendar()}
      {showModal && (
        <div style={{ width: "200px", height: "200px", background: "lightYellow", borderRadius: '8px' }}>
          <button onClick={() => setShowModal(false)}>닫기</button>
          <p>모달창</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
