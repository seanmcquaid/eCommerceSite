import axios from "axios"

export default (formData)=>{
    console.log("login action is running");
    console.log(formData)
    // communicates with our back end 
    const axiosPromise = axios({
        url: `${window.apiHost}/login`,
        method: "POST",
        data : formData
    })
    return{
        type: "LOGIN_ACTION",
        payload : axiosPromise
    }
}