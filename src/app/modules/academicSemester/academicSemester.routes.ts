import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcademicSchemaValidation),AcademicSemesterControllers.createAcademicSemester);

router.get('/',AcademicSemesterControllers.getAllAcademicSemester);

router.get('/:semesterId',AcademicSemesterControllers.getSingleAcademicSemester);

router.patch('/:semesterId',validateRequest(AcademicSemesterValidations.updateAcademicSchemaValidation),AcademicSemesterControllers.updateSingleAcademicSemester);

export const AcademicSemesterRouters=router;