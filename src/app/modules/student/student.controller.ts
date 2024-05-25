import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
/* import studentValidationSchema from './student.validation'; */

const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllAtudentsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students data retrieved successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student data retrieved successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSingleStudent=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {studentId}=req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student data deleted  successfully!',
      data: result,
    });

  } catch (err) {
    next(err);
  }
}

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
