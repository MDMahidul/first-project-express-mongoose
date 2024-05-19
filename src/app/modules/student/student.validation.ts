import Joi from 'joi';
// creating schema validation  using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/, 'capitalized')
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.name': 'First name must start with a capital letter',
    }),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]*$/)
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Last name is not valid',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.base': 'Father name must be a string',
    'string.empty': 'Father name is required',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Father occupation must be a string',
    'string.empty': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.base': 'Father contact must be a string',
    'string.empty': 'Father contact is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.base': 'Mother name must be a string',
    'string.empty': 'Mother name is required',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Mother occupation must be a string',
    'string.empty': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.base': 'Mother contact must be a string',
    'string.empty': 'Mother contact is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Local guardian name must be a string',
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.base': 'Local guardian occupation must be a string',
    'string.empty': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': 'Local guardian contact must be a string',
    'string.empty': 'Local guardian contact is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.base': 'Local guardian address must be a string',
    'string.empty': 'Local guardian address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Name must be an object',
    'any.required': 'User name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'string.base': 'Gender must be a string',
    'string.empty': 'Gender is required',
    'any.only': 'Gender must be one of "male", "female", or "others"',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .messages({
      'string.base': 'Blood group must be a string',
      'any.only':
        'Blood group must be one of "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address is required',
  }),
  parmanentAddress: Joi.string().trim().required().messages({
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian must be an object',
    'any.required': 'Guardian is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian must be an object',
    'any.required': 'Local guardian is required',
  }),
  profileImage: Joi.string().uri().messages({
    'string.base': 'Profile image must be a string',
    'string.uri': 'Profile image must be a valid URI',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'string.base': 'Status must be a string',
    'any.only': 'Status must be either "active" or "blocked"',
  }),
});


export default studentValidationSchema;