function flattenCallLogs(apiResponse) {
  const logs = [];

  // If the response is an array (multiple buyers)
  if (Array.isArray(apiResponse)) {
    apiResponse.forEach((buyerData) => {
      const buyer = buyerData.buyer || {};
      const callLogs = buyerData.callLogs || [];

      callLogs.forEach((log) => {
        logs.push({
          ...log,
          buyer: buyer,
          campaign: log.campaign || buyerData.campaign || {},
        });
      });
    });
  } else {
    // If response is a single buyer object
    const buyer = apiResponse.buyer || {};
    const callLogs = apiResponse.callLogs || [];

    callLogs.forEach((log) => {
      logs.push({
        ...log,
        buyer: buyer,
        campaign: log.campaign || {},
      });
    });
  }

  return logs;
}

export default flattenCallLogs