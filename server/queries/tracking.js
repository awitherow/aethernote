import db from '../db';

export const trackHabit = ({name, value, username}) => {
    db.none('insert into habits(name, value, username)values( ${name}, ${value}, ${username})',
  { name, value, username }).catch(e => new Error(e));
};

export const trackExercise = ({exercise, value, username}) => {
    db.none(
    'insert into exercises(exercise, value, username)values( ${exercise}, ${value}, ${username})'
    , { exercise, value, username }).catch(e => new Error(e));
};
