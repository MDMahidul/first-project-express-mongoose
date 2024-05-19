import validator from 'validator';
import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

// 2. Create a Schema corresponding to the document interface.
//sub-schema-1
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlengt: [20, 'First name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});
//sub-schema-2
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father contact is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'mother name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'mother contact is required'],
  },
});
//sub-schema-3
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, trim: true, required: [true, 'LG name is required'] },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'LG occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'LG contact is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'LG address is required'],
  },
});
//main schema
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: { type: userNameSchema, required: [true, 'User name is required'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message:
        "The gender field can only be one of the following: 'male', 'female', 'others'",
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    trim: true,
    required: [true, 'email is required'],
    unique: true,
    validate:{
      validator:(value:string)=>validator.isEmail(value),
      message:'{VALUE} is not a email type'
    }
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'contact is required'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'em contact is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, 'P.Address is required'],
  },
  parmanentAddress: {
    type: String,
    trim: true,
    required: [true, 'Par.Address is required'],
  },
  guardian: { type: guardianSchema, required: [true, 'Gurdian is required'] },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'LG is required'],
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    trim: true,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// 3. Create a Model.
export const StudentModel = model<Student>('Student', studentSchema);
