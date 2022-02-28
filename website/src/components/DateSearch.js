import react, { useState, forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerTemplate = styled.div`
    .example-custom-input{
        height: 45px;
        width: 130px;
        cursor: pointer;
    }

    .some-custom-class{
        z-index: 1000 !important; // content component에 가려짐
    }

    .react-datepicker__input-container {
        width: 163px;
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
const DatePickerComponent = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className="example-custom-input" onClick={onClick} ref={ref}>
            {value ? value : 'Search Date'}
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
                        offset: [0, 0],
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

function DateSearch() {
    return (
        // <input type='week' style={{width: '150px', fontSize: '10px'}}/>
        <DatePickerTemplate>
            <DatePickerComponent />
        </DatePickerTemplate>
        // <DatePickerComponent />
    );
}

export default DateSearch;