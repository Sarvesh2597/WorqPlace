import axios from 'axios';
import {getLoggedInUser} from "../helpers/authUtils"
import {BASE_URL} from "../constants/endpoint"

const userInfo = getLoggedInUser();
const API_KEY = {
    url:axios.create({
        baseURL: BASE_URL,
        headers: {'Authorization': `Bearer ${userInfo?.token}`}
      }),
      path:{
         boardDetails:'/board/details?id=',
         moveTask:'/tasklist/task/move',
         createTaskList:'/tasklist/create',
         tasklist:'/tasklist/',
         createTask:'/tasklist/task/create',
         updateTask:'/tasklist/task/update',
         users:'/users/list',
         addComment:'tasklist/task/addcomment',
         addAttachment:"tasklist/task/addAttachments",
         deleteComment:'tasklist/task/deletecomment',
         deleteAttachment:'tasklist/task/deleteAttachments',
         listChat: 'conversation/list/',
         message : 'conversation/message',
         deleteAttachment:'tasklist/task/deleteAttachments',
         getAssignTaskList:'/task/usertasks/',
         getMyTasks: '/tasklist/mytask',
         getMyTasksByboard: '/tasklist/mytaskByBoard'
      }
};

export default API_KEY;
