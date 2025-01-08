import * as types from "../constants/ActionTypes";
import * as api from "../constants/ReUsageStaff";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();
//Data fetch
export const datafetchStart = (page) => ({
  type: types.LIST_FETCH_START,
  payload: {
    datafetchLoading: true,
    data:""
    // ...(page == 0 && { data: "" }),
   },
});

export const datafetchSuccess = (data) => ({
  type: types.LIST_FETCH_SUCCESS,
  payload: {
    data: data,   
    datafetchLoading: false,
  },
});

export const datafetchFailure = (error) => ({
  type: types.LIST_FETCH_FAILURE,
  payload: {    
    error: error,   
    datafetchLoading:false
  },
});


export const dataFetch = (paginate,text,page) => (dispatch) => {
  // console.log("search_data 11",page)

  dispatch(datafetchStart(paginate));
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", "Bearer ");
  headers.append("Origin", "*");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  let paggination = paginate?paginate:5
  fetch(api.base_url+(page!=undefined?`?page=${page}`: "/?paginate="+paggination+`${text?"&search="+text:""}`))
    .then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    

    .then(([statusCode, data]) => {
      // console.log("search_data 22",data)
      if(data){
         dispatch(datafetchSuccess(data));

      }else{
       dispatch(datafetchFailure("error"));

      }
    })
    .catch((error) => {
       dispatch(datafetchFailure(error));
    });
};

