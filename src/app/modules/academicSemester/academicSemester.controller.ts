import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";
import catchAsync from "../../utils/catchAsync";
import { RequestHandler } from "express";

const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semseter is created successfully',
      data: result,
    });
  },
);

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
