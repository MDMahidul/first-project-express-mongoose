import { Student } from './student.model';
import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllAtudentsFromDB = async (query: Record<string, unknown>) => {
  // create a copy of the base query to avoid mutation
  //const queryObj = { ...query };

  //{email:{$regex:query.searchTerm,$options:i}}
  /* const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  } */

  // create search query
  /* const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  }); */

  // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excluding item from query
  //excludeFields.forEach((el) => delete queryObj[el]);

  /* console.log({ query }, { queryObj });

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }); */
  // default sorting prop
  /*  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  } */

  // sort chaining
  /* const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit); */

  // field limiting
  //let fields = '-__v';
  //fields:'name email' formatting
  /*  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  } */

  /*   const fieldQuery = await limitQuery.select(fields);
  return fieldQuery; */

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid student ID!');
  }
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  // get the non ptimitive data
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const isStudentExist = await Student.findOne({ id });
  const isUserExist = await User.findOne({ id });
  if (!isStudentExist || !isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
  }
  //start session
  const session = await mongoose.startSession();
  try {
    //start transaction
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    // commit transaction if successed
    await session.commitTransaction();
    // end session if successed
    await session.endSession();

    return deletedUser;
  } catch (error) {
    // abort transaction if failed
    await session.abortTransaction();
    // end session if successed
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentServices = {
  getAllAtudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateStudentIntoDB,
};
