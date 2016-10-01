export function checkAuth(req, res) {
  const { id, key } = req.query;
  const validUserId = process.env.USER_ID;
  const validUserKey = process.env.USER_KEY;

  let data = false;

  if (id === validUserId && key === validUserKey) data = true;

  res.status(200)
  .json({
    status: 'success',
    data,
    message: data ? 'Authenticated' : 'Authentication failed',
  });
}
