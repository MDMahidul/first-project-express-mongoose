import {Model} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
// for creating static
export interface StudentModel extends Model<TStudent>{
  isUserExists(id:string):Promise<TStudent | null>
}



// for instance
// Put all user instance methods in this type:
/* export type StudentMethods = {
  isUserExists(id:string):Promise<TStudent | null>
} */

// Create a new Model type that knows about students methods.
/* export type StudentModel = Model<TStudent,Record<string,never>,StudentMethods> */
