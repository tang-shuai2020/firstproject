import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
    //mutation用于修改state的状态
    //mutation完成的事件尽量单一
    [ADD_COUNTER](state,payload){
        payload.count++;
    },
    [ADD_TO_CART](state,payload){
        payload.checked =true;
        state.cartList.push(payload)
    }
}