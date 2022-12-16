
import { CloudWatchClient } from "@aws-sdk/client-cloudwatch";
// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
// Create an Amazon CloudWatch service client object.
export const cwClient = new CloudWatchClient({ 
    region: REGION,
    accessKeyId: 'AKIAVP46KEXW2GKCAUO2',
    secretAccessKey: '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',
 });