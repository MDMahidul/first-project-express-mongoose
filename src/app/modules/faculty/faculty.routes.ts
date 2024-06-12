import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(),FacultyControllers.getAllFaculties);

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updatedFaculty,
);

router.delete('/:id', FacultyControllers.deleteSingleFaculty);

export const FacultyRouters = router;
