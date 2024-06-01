import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not give use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // implement transaction
  //setp 1: create session
  const session = await mongoose.startSession();
  try {
    //step 2: start transaction
    session.startTransaction();

    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    //create a user (transaction-1)
    const newUser = await User.create([userData], { session }); //array

    //create a user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    //create a user (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }
    // step 3: commit session if success
    await session.commitTransaction();

    // step 4: end session if success
    await session.endSession();

    return newStudent;
  } catch (error) {
    //step 3: abbort session if error happend
    await session.abortTransaction();
    //step 4: end session 
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
