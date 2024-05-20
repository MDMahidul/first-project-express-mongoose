import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
/* import studentValidationSchema from './student.validation'; */


const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //joi validation schema
    /*  const { error, value } = studentValidationSchema.validate(studentData); */

    //zod validation schema
    const zodparseData=studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodparseData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllAtudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students data retrieved successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student data retrieved successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
