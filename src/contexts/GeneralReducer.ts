import {
  GRADE,
  STUDENT
} from "./types";

const GeneralReducer = (prevState: any, { type, payload }: any) => {
  switch (type) {
    case STUDENT:
      return {
        ...prevState,
        students: payload,
      };
      case GRADE:
      return {
        ...prevState,
        grades: payload,
      };
    
    default:
      return prevState;
  }
};

export default GeneralReducer;
