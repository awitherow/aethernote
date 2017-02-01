SELECT title, prio, category, context
FROM entries
WHERE username = ${username} AND due = ${due} AND category = ${category}