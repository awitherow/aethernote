import db from '../db'

export const trackHabit = ({name, value}) => {
  db.none('insert into habits(name, value)values( ${name}, ${value})',
  { name, value }).catch(err => console.log(err))
}

export const trackExercise = ({exercise, value}) => {
  db.none(
    'insert into exercises(exercise, value)values( ${exercise}, ${value})'
    , { exercise, value }).catch(err => console.log(err))
}
