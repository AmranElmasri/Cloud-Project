
// Import required AWS SDK clients and commands for Node.js
import { PutMetricAlarmCommand, DeleteAlarmsCommand } from "@aws-sdk/client-cloudwatch";
// import { cwClient } from "../libs/index.js";

import { CloudWatchClient } from "@aws-sdk/client-cloudwatch";
// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
// Create an Amazon CloudWatch service client object.
export const cwClient = new CloudWatchClient({ 
    region: REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: proccess.env.AWS_SECRET_ACCESS_KEY,
    
 });
// Set the parameters
export const params = {
  AlarmName: "cloud-user",
  ComparisonOperator: "GreaterThanThreshold",
  EvaluationPeriods: 1,
  MetricName: "cloud-ec2",
  Namespace: "AWS/EC2",
  Period: 60,
  Statistic: "Average",
  Threshold: 95.0, 
  ActionsEnabled: false,
  AlarmDescription: "cache exceed 95% of storage",
  Dimensions: [
    {
      Name: "iug_cloud",
      Value: "i-03c967ac5b1b1dfb8",
    },
  ],
  Unit: "Percent",
};

export const run = async () => {
  try {
    const data = await cwClient.send(new PutMetricAlarmCommand(params));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
// Uncomment this line to run execution within this file.


// // Set the parameters
// export const params = { AlarmNames: "cloud-user" }; // e.g., "Web_Server_CPU_Utilization"

// export const run = async () => {
//   try {
//     const data = await cwClient.send(new DeleteAlarmsCommand(params));
//     console.log("Success, alarm deleted; requestID:", data);
//     return data;
//   } catch (err) {
//     console.log("Error", err);
//   }
// };


run();




var cloudwatch = require('aws-cloudwatch');
function cloudWatchAddMetric(items, requests, size, miss_rate, hit_rate){
    var cloudwatch = new cloudwatch({
        accessKeyId: 'AKIAJ2Z',
        secretAccessKey: 'Z',
        region: 'us-east-1',
        version: 'latest'
    });
    var params = {
        MetricData: [
            {
                MetricName: 'items',
                Dimensions: [
                    {
                        Name: 'items',
                        Value: 'items'
                    }
                ],
                Unit: 'Count',
                Value: items
            },
            {
                MetricName: 'requests',
                Dimensions: [
                    {
                        Name: 'requests',
                        Value: 'requests'
                    }
                ],
                Unit: 'Count',
                Value: requests
            },
            {
                MetricName: 'size',
                Dimensions: [
                    {
                        Name: 'size',
                        Value: 'size'
                    }
                ],
                Unit: 'Count',
                Value: size
            },
            {
                MetricName: 'miss_rate',
                Dimensions: [
                    {
                        Name: 'miss_rate',
                        Value: 'miss_rate'
                    }
                ],
                Unit: 'Count',
                Value: miss_rate
            },
            {
                MetricName: 'hit_rate',
                Dimensions: [
                    {
                        Name: 'hit_rate',
                        Value: 'hit_rate'
                    }
                ],
                Unit: 'Count',
                Value: hit_rate
            }
        ],
        Namespace: 'memcached'
    };
    cloudwatch.putMetricData(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}
