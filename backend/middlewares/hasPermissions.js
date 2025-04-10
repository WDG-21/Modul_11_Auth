import ErrorResponse from '../utils/ErrorResponse.js';

export default function hasPermissions(...roles) {
  return (req, res, next) => {
    const { role, _id } = req.user;
    const { id } = req.params;

    if (roles.includes('self') && _id.toString() === id) return next();
    if (!roles.includes(role)) throw new ErrorResponse('Not Authorized', 403);

    next();
  };
}
