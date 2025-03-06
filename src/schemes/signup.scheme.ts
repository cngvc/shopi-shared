import Joi, { ObjectSchema } from 'joi';

export const signupSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(4).max(12).messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Invalid username',
    'string.max': 'Invalid username',
    'string.empty': 'Username is required',
  }),
  password: Joi.string().required().min(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.empty': 'Password is required',
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Invalid email',
    'string.empty': 'Email is required',
  }),
});

export const signupClientSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().min(8).required().messages({
    'string.min': 'Confirm password must be at least 8 characters',
    'any.required': 'Confirm password is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
  }),
}).custom((data, helpers) => {
  if (data.password !== data.confirmPassword) {
    return helpers.error('any.invalid', { message: "Password don't match" });
  }
  return data;
});
