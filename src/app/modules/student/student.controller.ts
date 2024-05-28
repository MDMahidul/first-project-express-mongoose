import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
/* import studentValidationSchema from './student.validation'; */



const getAllStudents = catchAsync(async (req, res) => {

    const result = await StudentServices.getAllAtudentsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students data retrieved successfully!',
      data: result,
    });
});

const getSingleStudent =catchAsync( async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student data retrieved successfully!',
      data: result,
    });
})

const deleteSingleStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student data deleted  successfully!',
      data: result,
    });
  
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
