import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {

  //custom static methods
   if (await Student.isUserExists(studentData.id)) {
     throw new Error('User already exists!');
   }

  //built-in static method
  const result = await Student.create(studentData);

 

  //create an instance
  /*  const student = new Student(studentData);

  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
 */
  //built-in instance method
  //const result = await student.save();
  return result;
};

const getAllAtudentsFromDB = async () => {
  const result = await Student.find();

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleted:true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllAtudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
