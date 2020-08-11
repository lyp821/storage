/* eslint-disable no-template-curly-in-string */
import http from "../unit/http";
// import cookie from 'js-cookie'

let cchlHeaders = {
  Authorization:
    "d88fb408678bbafd262fdf2064fd2a0d44ee24571e5dc0dd26f3f2fda9820aed:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lc3BhY2VfaWQiOjEzfQ.vdR4VgwgEh2Ph_78E4MP2ovki0c-_oiB8sJZzQ9mJmI"
};
export default {
  //获取证书流程
  getUserCredential(flowId,user_id){
    return http.get(`/api/v4/yaw/flows/${flowId}/journeys/proposed_journeys?query&user_id=${user_id}`,'',cchlHeaders)
  },
//  获取流程名字
  getFlowName(){
    return http.get(`/api/v4/yaw/flows/125`,'',cchlHeaders)
  },
  // 获取表单数据
  getFormsResponsesAPI(tableID) {
    return http.get(`/api/v4/forms/${tableID}/responses`, "", cchlHeaders);
  },
};
