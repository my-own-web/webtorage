import react, { useState, forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDateRange, useSetDateRange } from "./InfoContext";

const DatePickerTemplate = styled.div`
    // 버튼 디자인
    .example-custom-input{
      height: 25px;
      width: 80px;
      cursor: pointer;
      text-align: center;
      background: whitesmoke;
      border: solid #bfbdbd 1px;
      border-radius: 7px;
      font-size: 12px;
      &:hover{
        background: #bfbdbd;
      }
    }

    .react-datepicker-wrapper{
      width: 80px;
    }

    .react-datepicker__input-container {
        width: 200px; // reset 버튼 포함
    }

    .react-datepicker__close-icon::after{
        // 리셋 버튼
        background: transparent;
        color: red;
        font-size: 30px;
    }

    .react-datepicker {
        font-size: 0.8em;
      }
      .react-datepicker__header {
        padding-top: 0.7em;
      }
      .react-datepicker__month {
        margin: 0.4em 0.5em;
      }
      .react-datepicker__day-name, .react-datepicker__day {
        width: 1.6em;
        line-height: 1.9em;
        margin: 0.166em;
      }
      .react-datepicker__current-month {
        font-size: 1em;
      }
      .react-datepicker__navigation {
        top: 0.2em;
        line-height: 2.2em;
        height: 2.4em;
      }
      .react-datepicker__navigation--previous {
        border-right-color: #ccc;
        left: 1.5em;
      }
      .react-datepicker__navigation--next {
        border-left-color: #ccc;
        right: 1.5em;
      }
`

/* get raw input value on change
() => {
  const [startDate, setStartDate] = useState(null);
  const handleChangeRaw = (value) => {
    if (value === "tomorrow") {
      setStartDate(addDays(new Date(), 1));
    }
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      placeholderText='Enter "tomorrow"'
      onChangeRaw={(event) => handleChangeRaw(event.target.value)}
    />
  );
};
*/
const DatePickerComponent = () => {
  const setDateRange = useSetDateRange();
  const [startDate, endDate] = useDateRange();

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input" onClick={onClick} ref={ref}>
      {value ? value : '날짜 검색'}
    </button>
  ));

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
      customInput={<ExampleCustomInput />}
      popperClassName="some-custom-class"
      popperPlacement="top-end"
      popperModifiers={[
        {
          name: "offset",
          options: {
            offset: [-15, 0],
          },
        },
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
            tether: false,
            altAxis: true,
          },
        },
      ]}
    />
  );
}

function DateButton() {
  return (
    // <input type='week' style={{width: '150px', fontSize: '10px'}}/>
    <DatePickerTemplate>
      <DatePickerComponent />
    </DatePickerTemplate>
    // <DatePickerComponent />
  );
}

export default DateButton;