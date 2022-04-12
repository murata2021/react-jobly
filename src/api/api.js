import axios from "axios";
import { store } from "../state/store";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

//  axios.interceptors.request.use((request)=>{
//   const {header}=store.getState();
//   if(header){
//       request.headers["Authorization"]=header;
//   }
//   return request;
// })

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    let headers;
    const { header } = store.getState();
    if (header) {
      headers = { Authorization: header };
    }
    // const headers = { Authorization: `Bearer ${JoblyApi.token}` };

    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies (optional name filter is also availabel) */

  static async getCompanies(name) {
    let res;
    if (!name) {
      res = await this.request(`companies`);
    } else {
      res = await this.request(`companies`, { name: name });
    }
    return res;
  }

  static async getJobs(title) {
    let res;
    if (!title) {
      res = await this.request(`jobs`);
    } else {
      res = await this.request(`jobs`, { title: title });
    }

    return res;
  }

  static async signUp(body) {
    let res;

    res = await this.request("auth/register", body, "post");
    return res;
  }

  static async login(body) {
    let res;

    res = await this.request("auth/token", body, "post");
    return res;
  }

  static async verify(username, password) {
    const res = await this.request(
      "auth/token",
      { username, password },
      "post"
    );
    return res;
  }

  static async userUpdate(username, body) {
    const res = await this.request(`users/${username}`, body, "patch");

    return res;
  }

  static async getUserByUsername(username) {
    const res = await this.request(`users/${username}`);
    return res;
  }

  static async applyToJobs(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`,{},"post");
    return res;
  }

  static async getUserApplications(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }
}


export default JoblyApi;
