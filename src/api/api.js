import axios from 'axios';

// let base = 'http://10.10.30.70:8000';
let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

export const requestLogin = params => { return axios.post(`/api/login/`, params).then(res => res.data); };
export const getDatabaseList = params => { return axios.get(`/api/clean-data/database/list/`, params).then(res => res.data); };
export const getTable =  params => { return axios.get(`/api/clean-data/table/list/`, params).then(res => res.data); };
export const getAllData = params => { return axios.get(`/api/clean-data/data/info/`, params).then(res => res.data); };
export const postSaveReader = params => { return axios.post(`/api/clean-data/create_task/`, params).then(res => res.data); };
//获取任务信息
export const getConfigTableInfo = params =>  { return axios.get(`/api/clean-data/config_task/`, params).then(res => res.data); };
// 获取正确数据
export const getConfigSuccess = params =>  { return axios.get(`/api/clean-data/clean_success_writer/`, params).then(res => res.data); };
// 获取错误数据
export const getConfigError =  params =>  { return axios.get(`/api/clean-data/clean_error_writer/`, params).then(res => res.data); };
// 保存或修改正确数据
export const postConfigSuccess =  params => { return axios.post(`/api/clean-data/task/detail/`, params).then(res => res.data); };