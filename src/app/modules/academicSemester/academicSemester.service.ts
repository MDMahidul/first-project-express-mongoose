import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // checking semester name with code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllAcademicSemester = async () => {
  const result = await AcademicSemester.find();

  return result;
};

const getSingleAcademicSemester = async(id:string)=>{
  const result = await AcademicSemester.findById(id);

  return result;
}

const updateSingleAcademicSemester = async(id:string,payload:Partial<TAcademicSemester>)=>{
  //check validation of semester name and code
  if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error('Invalid semester code!')
  }
  const result = await AcademicSemester.findByIdAndUpdate({_id:id},payload,{new:true});

  return result;
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
