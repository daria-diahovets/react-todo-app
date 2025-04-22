import { JSX, useEffect, useState } from "react";
import classes from "./DateInput.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate as setSelectedTodoDate } from "../../redux/todoState/todoSlice";
import { TRootState } from "../../redux/store";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const yearArray = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

export default function DateInput() {
  const dispatch = useDispatch();
  const selectedDateTodo = useSelector(
    (state: TRootState) => state.todos.selectedDate,
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(selectedDate.getFullYear());
  const [month, setMonth] = useState<number>(selectedDate.getMonth());
  const [dates, setDates] = useState<JSX.Element[]>([]);

  useEffect(() => {
    displayDates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, selectedDate]);

  function toggleDatepicker() {
    setIsVisible((prev) => !prev);
  }
  function handleCloseDatepicker() {
    setIsVisible(false);
  }
  function handleApplyDatepicker() {
    const formattedDate = selectedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    dispatch(setSelectedTodoDate(formattedDate));
    setIsVisible(false);
  }
  function handlePrevMonth() {
    if (month === 0) {
      setYear((prev) => prev - 1);
      setMonth(11);
    } else {
      setMonth((prev) => prev - 1);
    }
  }
  function handleNextMonth() {
    if (month === 11) {
      setYear((prev) => prev + 1);
      setMonth(0);
    } else {
      setMonth((prev) => prev + 1);
    }
  }
  function handleMonthChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setMonth(parseInt(e.target.value));
  }
  function handleYearChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setYear(parseInt(e.target.value));
  }
  function handleDateClick(day: number) {
    setSelectedDate(new Date(year, month, day));
  }
  function displayDates() {
    const days: JSX.Element[] = [];

    const lastOfPrevMonth = new Date(year, month, 0);
    for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
      const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
      days.push(
        <button key={`prev-${i}`} disabled>
          {text}
        </button>,
      );
    }

    const lastOfMonth = new Date(year, month + 1, 0);
    for (let i = 1; i <= lastOfMonth.getDate(); i++) {
      const isSelected =
        selectedDate.getDate() === i &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month;
      days.push(
        <button
          key={`current-${i}`}
          onClick={() => handleDateClick(i)}
          className={`${isSelected ? classes.selected : ""}`}
        >
          {i}
        </button>,
      );
    }

    const firstOfNextMonth = new Date(year, month + 1, 1);
    for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
      const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;
      days.push(
        <button key={`next-${i}`} disabled>
          {text}
        </button>,
      );
    }

    setDates(days);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.input} onClick={toggleDatepicker}>
        <svg
          width="17"
          height="19"
          viewBox="0 0 17 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_31_393)">
            <path
              d="M17 4.21114V5.84653H0V4.21114C0 3.17693 0.856345 2.3392 1.91354 2.3392H3.60724V1.11241C3.60724 0.497556 4.11685 0 4.74437 0H4.95221C5.58073 0 6.09034 0.497556 6.09034 1.11241V2.3392H10.8917V1.11241C10.8917 0.497556 11.4003 0 12.0288 0H12.2366C12.8642 0 13.3738 0.497556 13.3738 1.11241V2.3392H15.0865C16.1437 2.3392 17 3.17693 17 4.21114Z"
              fill="currentColor"
            />
            <path
              d="M0 7.13586V17.2356C0 18.2102 0.807383 19 1.80262 19H15.1964C16.1926 19 17 18.2102 17 17.2356V7.13586H0ZM4.84829 16.0899C4.84829 16.4047 4.58749 16.6608 4.26474 16.6608H2.95074C2.62799 16.6608 2.36619 16.4047 2.36619 16.0899V14.8035C2.36619 14.4878 2.62799 14.2326 2.95074 14.2326H4.26474C4.58749 14.2326 4.84829 14.4878 4.84829 14.8035V16.0899ZM4.84829 11.3626C4.84829 11.6784 4.58749 11.9335 4.26474 11.9335H2.95074C2.62799 11.9335 2.36619 11.6784 2.36619 11.3626V10.0762C2.36619 9.76148 2.62799 9.50537 2.95074 9.50537H4.26474C4.58749 9.50537 4.84829 9.76148 4.84829 10.0762V11.3626ZM9.74155 16.0899C9.74155 16.4047 9.47975 16.6608 9.157 16.6608H7.843C7.52025 16.6608 7.25845 16.4047 7.25845 16.0899V14.8035C7.25845 14.4878 7.52025 14.2326 7.843 14.2326H9.157C9.47975 14.2326 9.74155 14.4878 9.74155 14.8035V16.0899ZM9.74155 11.3626C9.74155 11.6784 9.47975 11.9335 9.157 11.9335H7.843C7.52025 11.9335 7.25845 11.6784 7.25845 11.3626V10.0762C7.25845 9.76148 7.52025 9.50537 7.843 9.50537H9.157C9.47975 9.50537 9.74155 9.76148 9.74155 10.0762V11.3626ZM14.6338 16.0899C14.6338 16.4047 14.372 16.6608 14.0493 16.6608H12.7353C12.4125 16.6608 12.1507 16.4047 12.1507 16.0899V14.8035C12.1507 14.4878 12.4125 14.2326 12.7353 14.2326H14.0493C14.372 14.2326 14.6338 14.4878 14.6338 14.8035V16.0899ZM14.6338 11.3626C14.6338 11.6784 14.372 11.9335 14.0493 11.9335H12.7353C12.4125 11.9335 12.1507 11.6784 12.1507 11.3626V10.0762C12.1507 9.76148 12.4125 9.50537 12.7353 9.50537H14.0493C14.372 9.50537 14.6338 9.76148 14.6338 10.0762V11.3626Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_31_393">
              <rect width="17" height="19" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <input
          readOnly
          value={
            selectedDateTodo === null
              ? "DATE"
              : selectedDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
          }
          type="text"
        />
      </div>
      <div
        className={`${classes.datepicker} ${isVisible ? classes.visible : ""}`}
      >
        <div className={classes.header}>
          <button onClick={handlePrevMonth}>Prev</button>
          <select
            className={classes["month-input"]}
            value={month}
            onChange={handleMonthChange}
          >
            {monthNames.map((month, index) => (
              <option value={index} key={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            className={classes["year-input"]}
            value={year}
            onChange={handleYearChange}
          >
            {yearArray.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className={classes.days}>
          {dayNames.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className={classes.dates}>{dates}</div>
        <div className={classes.footer}>
          <button className={classes.cancel} onClick={handleCloseDatepicker}>
            Cancel
          </button>
          <button className={classes.apply} onClick={handleApplyDatepicker}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
