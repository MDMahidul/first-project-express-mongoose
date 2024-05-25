import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
/* import studentValidationSchema from './student.validation'; */




const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllAtudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students data retrieved successfully!',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
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
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const deleteSingleStudent=async(req:Request,res:Response)=>{
  try {
    const {studentId}=req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student data deleted  successfully!',
      data: result,
    });

  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
}

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
