import { useReducer, useContext } from "react";
import GeneralReducer from "./GeneralReducer";
import * as React from 'react';
import {
  GRADE,
  STUDENT
} from "./types";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Student } from "../models";
import {GeneralContext} from "./GeneralContext";



const GeneralState : React.FC<{children: React.ReactNode}> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const initialState = {
    students: [],
    grades:[],
  };
  const BASE_URL = process.env.REACT_APP_SERVER_URL;
  const [state, dispatch] = useReducer(GeneralReducer, initialState);

  const addStudents = async (data: any) => {
    const token =
     localStorage.getItem("accessToken")?.slice(1, -1);

   
    try {
      const res = await axios.post(`${BASE_URL}student`, data);
      if (res.status === 201) {
        return res.data;
      } else {
        return false;
      }
    } catch (error:any) {
      
      if (error?.response?.data?.statusCode === 401)
        window.location.replace("/auth-login");
      return {
        errorMsg: error.response.data.error.message,
        errorStatus: error.response.data.statusCode,
      };
    }
  };

  const editStudents = async (data: any, id: any) => {
    const token =
     localStorage.getItem("accessToken")?.slice(1, -1);

   
    try {
      const res = await axios.put(`${BASE_URL}student/${id}`, data);
      if (res.status === 200 || res.status === 204) {
        return true;
      } else {
        return false;
      }
    } catch (error:any) {
      if (error?.response?.data?.statusCode === 401)
        window.location.replace("/auth-login");
      return {
        errorMsg: error.response.data.message,
        errorStatus: error.response.data.statusCode,
      };
    }
  };

  const getAllStudents = async () => {
    const token =
      localStorage.getItem("accessToken")?.slice(1, -1);

    
    try {
      let res;
      
        res = await axios.get(`${BASE_URL}student?limit=${10}&page=${0}`);
     
      if (res.status === 200) {
        dispatch({
          type: STUDENT,
          payload: res.data.data,
        });
        //getSettings();
        return true;
      } else {
        return false;
      }
    } catch (error:any) {
      if (error?.response?.data?.statusCode === 401)
        window.location.replace("/auth-login");
      
    }
  };

  const getIdStudent = async (id: any) => {
    const token =
      localStorage.getItem("accessToken")?.slice(1, -1);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let res = await axios.get(`${BASE_URL}user/${id}`, config);
    return res;
  };

  const removeStudent = async (id: any) => {
    const token =
      localStorage.getItem("accessToken")?.slice(1, -1);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.delete(`${BASE_URL}student/${id}`, config);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error:any) {
      if (error?.response?.data?.statusCode === 401)
        window.location.replace("/auth-login");
      return {
        errorMsg: error.response.data.error.message,
        errorStatus: error.response.data.statusCode,
      };
    }
  };

  const removeMultipleStudent = async (id: any[]) => {
    const token =
      localStorage.getItem("accessToken")?.slice(1, -1);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.put(`${BASE_URL}student/remove/multiple`,{ids: id},config);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error:any) {
      if (error?.response?.data?.statusCode === 401)
        window.location.replace("/auth-login");
      return {
        errorMsg: error.response.data.error.message,
        errorStatus: error.response.data.statusCode,
      };
    }
  };

  const getAllGrades = async (itemPerPage: any, page: any) => {
    const token =
      localStorage.getItem("accessToken")?.slice(1, -1);

    
    try {
      let res;
      
        res = await axios.get(`${BASE_URL}grade?limit=${itemPerPage}&page=${page}`);
     
      if (res.status === 200) {
        dispatch({
          type: GRADE,
          payload: res.data.data,
        });
        //getSettings();
        return true;
      } else {
        return false;
      }
    } catch (error:any) {
      if (error?.response?.data?.statusCode === 401)
        window.location.replace("/auth-login");
      
    }
  };

  /* eslint-disable */

  return (
    
    <GeneralContext.Provider 
      value={{
        students: state.students,
        addStudents,
        editStudents,
        getAllStudents,
        removeStudent,
        getIdStudent, 
        removeMultipleStudent   ,
        grades: state.grades,   
        getAllGrades
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralState;
