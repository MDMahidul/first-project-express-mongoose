import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';
import catchAsync from '../../utils/catchAsync';
import { RequestHandler } from 'express';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semseter is created successfully!',
    data: result,
  });
});

const getAllAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemester();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Academic semseters is retrived successfully!',
    data: result,
  });
});
const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const { semesterId } = req.params;
    console.log(semesterId);
    const result =
      await AcademicSemesterServices.getSingleAcademicSemester(semesterId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semseter is retrived successfully!',
      data: result,
    });
  },
);

const updateSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const { semesterId } = req.params;
    const semesterUpdatedData = req.body;
    const result =
      await AcademicSemesterServices.updateSingleAcademicSemester(semesterId,semesterUpdatedData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semseter updated successfully!',
      data: result,
    });
  },
);

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
