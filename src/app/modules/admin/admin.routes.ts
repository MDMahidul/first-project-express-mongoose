import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { adminValidations } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmin);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(adminValidations.updateAdminValidationSchema),
  AdminControllers.updatedAdmin,
);

router.delete('/:id', AdminControllers.deleteSingleAdmin);

export const AdminRouters = router;
