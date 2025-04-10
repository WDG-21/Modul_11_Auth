import ErrorResponse from '../utils/ErrorResponse.js';

export default function validate(Schema) {
  return (req, res, next) => {
    const { error, value } = Schema.validate(req.body, { abortEarly: false });

    if (!value) throw new ErrorResponse('Data in JSON format required', 400);
    if (error) throw new ErrorResponse(error, 400);

    next();
  };
}
