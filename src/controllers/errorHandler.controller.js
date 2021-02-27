

module.exports = (err, req, res)=> {

  return res.status(404).json({
    status: 'fail',
    message: `Cannot find ${req.originalUrl} on this server`
  })

}