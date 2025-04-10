import Joi from 'joi';

const UserSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'First name cannot be empty',
    'string.min': 'First name must be at least {#limit} character long',
    'string.max': 'First name cannot exceed {#limit} characters',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'Last name cannot be empty',
    'string.min': 'Last name must be at least {#limit} character long',
    'string.max': 'Last name cannot exceed {#limit} characters',
    'any.required': 'Last name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
});

export default UserSchema;
