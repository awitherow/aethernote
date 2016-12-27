import db from '../db'

export const addHabit = ({name, value}) => {
  db.none('insert into habits(name, value)values( ${name}, ${value})',
  { name, value }).catch(err => console.log(err))
}
