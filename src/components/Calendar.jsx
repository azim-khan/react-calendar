import React, { Component } from "react";
import "../components/Calendar.css";

class Calendar extends Component {
  state = {
    date: new Date(),
    selectedDate: new Date()
  };

  _months = [
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
    "December"
  ];
  _days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  getSelectedDateLabel = () => {
    let date = this.state.selectedDate;
    return (
      this._months[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  };

  onSelectDate = date => {
    let selectedDate = this.state.selectedDate;
    if (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth()
    )
      this.setState({ selectedDate: date });
    else this.setState({ date: date, selectedDate: date });
  };

  onChangeMonth = change => {
    var newDate = new Date(this.state.date);
    newDate.setMonth(newDate.getMonth() + change);
    this.setState({ date: newDate });
  };

  getCurrentMonthLabel = () => {
    return (
      this._months[this.state.date.getMonth()] +
      ", " +
      this.state.date.getFullYear()
    );
  };

  getDateElement = loopTime => {
    let loopDay = new Date(loopTime),
      date = this.state.date,
      selectedDate = this.state.selectedDate,
      className = date.getMonth() !== loopDay.getMonth() ? "other-months" : "";

    className +=
      selectedDate.setHours(0, 0, 0, 0) === loopDay.getTime()
        ? " selected"
        : "";

    if (className.trim())
      return (
        <li
          key={loopTime}
          className={className.trim()}
          onClick={() => this.onSelectDate(loopDay)}
        >
          {loopDay.getDate()}
        </li>
      );

    return (
      <li key={loopTime} onClick={() => this.onSelectDate(loopDay)}>
        {loopDay.getDate()}
      </li>
    );
  };

  getDateElements() {
    let li = [],
      date = this.state.date,
      firstDate = new Date(date.getFullYear(), date.getMonth(), 1),
      lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0),
      firstDay = firstDate.getDay(),
      lastDay = lastDate.getDay();

    if (firstDay)
      firstDate = new Date(
        firstDate.getFullYear(),
        firstDate.getMonth(),
        0 - firstDay + 1
      );

    if (lastDay < 6)
      lastDate = new Date(
        lastDate.getFullYear(),
        lastDate.getMonth() + 1,
        6 - lastDay
      );

    for (
      let loopTime = firstDate.getTime();
      loopTime <= lastDate.getTime();
      loopTime += 86400000
    ) {
      li.push(this.getDateElement(loopTime));
    }

    return li;
  }

  render() {
    return (
      <div className="calendar-container">
        <div className="top-bar">
          <span onClick={() => this.onChangeMonth(-1)}>◀</span>
          {this.getCurrentMonthLabel()}
          <span onClick={() => this.onChangeMonth(1)}>▶</span>
        </div>
        <div>
          <ul>
            {this._days.map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="date-holder">
          <ul>{this.getDateElements()}</ul>
        </div>
        <div className="bottom-line">
          <button
            onClick={() =>
              this.setState({ date: new Date(), selectedDate: new Date() })
            }
          >
            Today
          </button>
          <span>{this.getSelectedDateLabel()}</span>
        </div>
      </div>
    );
  }
}

export default Calendar;
