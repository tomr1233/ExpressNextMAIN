import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { CfnOutput } from 'aws-cdk-lib';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a Lambda function from the Python code in your backend folder
    const myPythonLambda = new Function(this, 'MyPythonLambda', {
      runtime: Runtime.PYTHON_3_9,
      handler: 'lambda_function.lambda_handler',  // fileName.functionName
      code: Code.fromAsset(
        path.join(__dirname, '../../backend/my_lambda')
      ),
    });

    // Create an API Gateway endpoint pointing to the Lambda
    const api = new LambdaRestApi(this, 'MyApiGateway', {
      handler: myPythonLambda,
      // Defaults to proxy: true, so /ANY routes to the Lambda
    });

    // Output the API endpoint in CloudFormation outputs
    new CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
      description: 'Invoke this URL to hit the Lambda via API Gateway.',
    });
  }
}
