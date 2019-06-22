import config from "../../config";

export function numToDay(num) {
  const mapping = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  };
  return mapping[num] || "";
}

export function timeStringToNum(str) {
  return parseInt(str.replace(":", ""));
}

export function numToTimeString(num) {
  if (num === 1200) {
    return "12:00 PM";
  }
  if (num === 0) {
    return "12:00 AM";
  }
  const AMPM = num > 1200 ? "PM" : "AM";
  const numString = (num % 1200).toString();
  const breakpoint = numString.length - 2;
  return numString.substring(0, breakpoint) + ":" + numString.substring(breakpoint) + " " + AMPM;
}

export function parseShift(str) {
  const section = config.schedule.sections.find(s => str.indexOf(s) >= 0);

  const reg = /.*?(?<start>\d{1,2}\:\d{1,2}).*?(?<end>\d{1,2}:\d{1,2})/gm;
  const match = reg.exec(str);
  // I'd prefer to use named capture groups
  // but they aren't supported in Safari
  const startStr = match[1];
  const endStr = match[2];

  const start = timeStringToNum(startStr);
  const end = timeStringToNum(endStr);

  return {
    shift: section,
    start,
    end
  };
}

export function spreadsheetToSchedule(spreadsheet) {
  let entries = [];

  const numRows = spreadsheet.length;
  const numCols = spreadsheet[0].length;

  for (let i = 1; i < numRows; i++) {
    const currShift = spreadsheet[i][0].value;
    const { shift, start, end } = parseShift(currShift);
    for (let j = 1; j < numCols; j++) {
      const person = spreadsheet[i][j].value;
      const day = spreadsheet[0][j].value;
      const entry = {
        day,
        person,
        start,
        end,
        shift
      };
      entries.push(entry);
    }
  }

  return entries;
}

function shiftValueViewer({ shift, start, end }) {
  return `${shift} (${numToTimeString(start)} - ${numToTimeString(end)})`;
}

export function scheduleToSpreadsheet(schedule) {
  schedule.sort((a, b) => a.start - b.start);
  let spreadsheet = [[{ readOnly: true, value: '' }]];
  const len = schedule.length;

  let days = [];
  let shifts = [];

  for (let i = 0; i < len; i++) {
    const day = schedule[i].day;
    if (!days.includes(day)) {
      days.push(day);
      spreadsheet[0].push({ 
        value: day, 
        readOnly: true, 
        valueViewer: () => numToDay(day)
      });
    }
    const shift = schedule[i].shift;
    if (!shifts.includes(shift)) {
      shifts.push(shift);
      const val = {shift, start: schedule[i].start, end: schedule[i].end};
      spreadsheet.push([{ 
        value: val, readOnly: true, valueViewer: () => shiftValueViewer(val) }]);
    }
  }

  const numShifts = shifts.length;
  for (let i = 0; i < numShifts; i++) {
    const currShift = shifts[i];
    const peopleWorkingThisShift = schedule.filter(x => x.shift === currShift);
    peopleWorkingThisShift.sort((a, b) => a.day < b.day);
    const numPeople = peopleWorkingThisShift.length;
    for (let j = 0; j < numPeople; j++) {
      const person = peopleWorkingThisShift[j];
      spreadsheet[i+1].push({
        key: person["_id"],
        value: person["person"]
      })
    }
  }

  return spreadsheet;
}

export function onShiftFromSchedule(schedule) {
  const now = new Date();
  const nowNum = timeStringToNum(`${now.getHours()}:${now.getMinutes()}`);
  const people = schedule.filter(x => x.day === now.getDay() && x.start <= nowNum && x.end >= nowNum && x.person != "").map(x => x.person);
  return people.length ? people.join(", ") : "No one ";
}