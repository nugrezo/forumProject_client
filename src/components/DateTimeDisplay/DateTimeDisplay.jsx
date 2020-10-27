
import React from 'react' // we need this to make JSX compile

const firstMatch = 0

// Gets the month from a date string in the format:
//
// 2020-10-09
//
const getMonthFromMonthNumber = monthNumber => {
  let month

  switch (monthNumber) {
  case '01':
    month = 'January'
    break
  case '02':
    month = 'February'
    break
  case '03':
    month = 'March'
    break
  case '04':
    month = 'April'
    break
  case '05':
    month = 'May'
    break
  case '06':
    month = 'June'
    break
  case '07':
    month = 'July'
    break
  case '08':
    month = 'August'
    break
  case '09':
    month = 'September'
    break
  case '10':
    month = 'October'
    break
  case '11':
    month = 'November'
    break
  case '12':
    month = 'December'
    break
  default:
    break
  }

  return month
}

const getFormattedTimeString = timeStringToProcess => {
  const hourNumberIndex = 0
  const minuteNumberIndex = 1

  const timeStringComponents = timeStringToProcess.split(':')

  const hourNumber = timeStringComponents[hourNumberIndex]
  const minuteNumber = timeStringComponents[minuteNumberIndex]

  // Strip any leading zero from the hour, such as 02, unlesss the
  // hour is 00 (12am).
  let hour = hourNumber

  if (hourNumber !== '00') hour = hourNumber.replace(/^(0+)/, '')
  else hour = '12'

  let amOrPm = 'am'

  if (hourNumber >= 12) amOrPm = 'pm'

  // Convert military time to standard time.
  if (hourNumber >= 13) hour -= 12

  return `${hour}:${minuteNumber}${amOrPm}`
}

// Displays date and time based upon the following string format:
//
// "2020-10-09T16:40:13.579Z"
//
// This would be converted to:
//
// October 9, 2020 4:40pm
//
const DateTimeDisplay = ({ dateTimeString }) => {
  const yearNumberIndex = 0
  const monthNumberIndex = 1
  const dayNumberIndex = 2

  const dateString = dateTimeString.match(/^\d{4}-\d{2}-\d{2}/)[firstMatch]
  const timeString = dateTimeString.match(/\d{2}:\d{2}:\d{2}/)[firstMatch]

  const dateStringComponents = dateString.split('-')
  const yearNumber = dateStringComponents[yearNumberIndex]
  const monthNumber = dateStringComponents[monthNumberIndex]

  // Strip any leading zeroes from the day, such as October 09.
  const dayNumber = dateStringComponents[dayNumberIndex].replace(/^(0+)/, '')

  const dateDisplay =
    `${getMonthFromMonthNumber(monthNumber)} ${dayNumber}, ${yearNumber}`
  const timeDisplay = `${getFormattedTimeString(timeString)}`

  return <span>{ `${dateDisplay} ${timeDisplay} UTC` }</span>
}

export default DateTimeDisplay
