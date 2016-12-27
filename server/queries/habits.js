import db from '../db'

export const trackHabit = ({name, value}) => {
  db.none('insert into habits(name, value)values( ${name}, ${value})',
  { name, value }).catch(err => console.log(err))
}
