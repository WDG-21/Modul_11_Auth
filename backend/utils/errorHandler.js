export default function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack);
  }
  return res.status(err.statusCode || 500).json({ message: err.message });
}
