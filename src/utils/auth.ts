//function to check user is authentified as admin
function ensureAdmin (req: any, res: any, next: any) {
  const isAdmin = req.user && req.user.username === 'admin'
  if (isAdmin) return next()
  res.status(401).json({ error: 'Unauthorized' })
}

export default ensureAdmin;