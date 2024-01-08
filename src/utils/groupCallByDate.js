export const groupCallsByDate = (calls) => {
    return calls.reduce((groups, call) => {
        const date = new Date(call.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(call);
        return groups;
    }, {});
};

export const callsGroupedByDate = (feedCalls) => {
    return feedCalls.reduce((acc, call) => {
        const date = new Date(call.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(call);
        return acc;
    }, {});
}

