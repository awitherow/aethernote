SELECT title, prio, category, context, exp
FROM entries
WHERE username = ${username} AND due = ${due} AND category = ${category}