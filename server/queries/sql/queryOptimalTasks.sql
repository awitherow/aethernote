SELECT * FROM entries
WHERE category = 'doing'
OR category = 'todo'
ORDER BY category ASC
limit 10