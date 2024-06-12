import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.routes';
import { AcademicSemesterRouters as AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRouters } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRouters } from '../modules/academicDepartment/academicDepartment.routes';
import { FacultyRouters } from '../modules/faculty/faculty.routes';
import { AdminRouters } from '../modules/admin/admin.routes';
import { CourseRouters } from '../modules/course/course.routes';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
import { OfferedCourseRoutes } from '../modules/offeredCourse/offeredCourse.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouters,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouters,
  },
  {
    path: '/faculties',
    route: FacultyRouters,
  },
  {
    path: '/admins',
    route: AdminRouters,
  },
  {
    path: '/courses',
    route: CourseRouters,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
