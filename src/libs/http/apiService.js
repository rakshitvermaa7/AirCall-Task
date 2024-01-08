import { ApiEndpoints } from "../../utils/constant";
import { HttpClient } from "./axiosInstance";

const activeFeed = {
    getAllFeedCalls: () => HttpClient.get(ApiEndpoints.GET_ALL_CALLS),
    getAllFeedCallsById: (id) => HttpClient.get(`${ApiEndpoints.GET_ALL_CALLS_BY_ID}/${id}/`),
    deleteFeedCallsById: (id, data) => HttpClient.patch(`${ApiEndpoints.DELETE_BY_ID}${id}`, data),
    deleteAllFeedCalls: () => HttpClient.patch(ApiEndpoints.DELETE_BY_ALL)
}

export default activeFeed;

