import { Student } from './student.model';
import { TStudent } from './student.interface';


const getAllAtudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({id})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllAtudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
