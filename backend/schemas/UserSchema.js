import Joi from 'joi';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])/;

const email = Joi.string().email().required().messages({
  'string.empty': 'Email cannot be empty',
  'string.email': 'Please provide a valid email address',
  'any.required': 'Email is required',
});

const password = Joi.string().min(8).max(36).pattern(PASSWORD_REGEX).required().messages({
  'string.pattern.base': 'Password needs lowercase, uppercase letter and at least one special character and number.',
  'string.min': 'Password must have at least 8 characters',
  'any.required': 'Password required',
  'string.empty': 'Password cannot be empty',
});

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
  email,
  password,
});

const LoginSchema = Joi.object({ email, password });

export { UserSchema, LoginSchema };
