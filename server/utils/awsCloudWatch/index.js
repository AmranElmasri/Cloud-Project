
// Import required AWS SDK clients and commands for Node.js
import { PutMetricAlarmCommand, DeleteAlarmsCommand } from "@aws-sdk/client-cloudwatch";
// import { cwClient } from "../libs/index.js";

import { CloudWatchClient, PutMetricDataCommand  } from "@aws-sdk/client-cloudwatch";


var cloudwatch = new CloudWatchClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
    version: 'latest'
});



// Set the parameters
export const params = {
  MetricData: [
    {
      MetricName: "PAGES_VISITED",
      Dimensions: [
        {
          Name: "UNIQUE_PAGES",
          Value: "URLS",
        },
      ],
      Unit: "None",
      Value: 1.0,
    },
  ],
  Namespace: "SITE/TRAFFIC",
};

export const run = async () => {
  try {
    const data = await cloudwatch.send(new PutMetricDataCommand(params));
    console.log("Success", data.$metadata.requestId);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
// Uncomment this line to run execution within this file.
run();

