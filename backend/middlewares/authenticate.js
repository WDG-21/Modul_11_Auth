import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const authenticate = async (req, res, next) => {
  let { token } = req.cookies;

  const { authorization } = req.headers;

  if (authorization) {
    token = authorization.split(' ')[1];
  }
  if (!token) throw new ErrorResponse('Not authenticated', 401);

  let id;
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    id = _id;
  } catch (error) {
    // console.log(error);
    throw new ErrorResponse('Invalid token', 401);
  }

  const user = await User.findById(id).select('email role').lean();
  if (!user) throw new ErrorResponse('Not Authenticated', 401);

  req.user = user;

  next();
};

export default authenticate;
