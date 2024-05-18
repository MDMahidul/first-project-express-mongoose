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
  firstName: { type: String, required: [true, 'First name is required'] },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last name is required'] },
});
//sub-schema-2
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact is required'],
  },
  motherName: { type: String, required: [true, 'mother name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'mother contact is required'],
  },
});
//sub-schema-3
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'LG name is required'] },
  occupation: { type: String, required: [true, 'LG occupation is required'] },
  contactNo: { type: String, required: [true, 'LG contact is required'] },
  address: { type: String, required: [true, 'LG address is required'] },
});
//main schema
const studentSchema = new Schema<Student>({
  id: { type: String,required:true,unique:true },
  name: { type: userNameSchema, required: [true, 'User name is required'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message:"The gender field can only be one of the following: 'male', 'female', 'others'"
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'email is required'] },
  contactNo: { type: String, required: [true, 'contact is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'em contact is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: { type: String, required: [true, 'P.Address is required'] },
  parmanentAddress: {
    type: String,
    required: [true, 'Par.Address is required'],
  },
  guardian: { type: guardianSchema, required: [true, 'Gurdian is required'] },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'LG is required'],
  },
  profileImage: { type: String },
  isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
});

// 3. Create a Model.
export const StudentModel = model<Student>('Student', studentSchema);
