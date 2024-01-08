import activeFeed from "../libs/http/apiService";

export const getAllFeedCall = async () => {
    try {
        const feedCallResponse = await activeFeed.getAllFeedCalls();
        return feedCallResponse;
    } catch (error) {
        console.log("error", error);
    }
};

export const getCallDetailById = async (callID) => {
    try {
        const callDetailResponse = await activeFeed.getAllFeedCallsById(callID);
        return callDetailResponse;
    } catch (error) {
        console.log("error", error);
    }
}

export const deleteCallById = async (callID, data) => {
    try {
        const deleteCallResponse = await activeFeed.deleteFeedCallsById(callID, data);
        return deleteCallResponse;
    } catch (error) {
        console.log("error", error);
    }
}

export const archivedAllCall = async () => {
    try {
        const archivedCallResponse = await activeFeed.deleteAllFeedCalls();
        return archivedCallResponse;
    } catch (error) {
        console.log("error", error);
    }
}