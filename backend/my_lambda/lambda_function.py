# backend/my_lambda/lambda_function.py

def lambda_handler(event, context):
    """
    A simple Lambda handler that echoes a 'Hello World' message.
    :param event: Lambda uses this parameter to pass event data to the handler.
    :param context: Provides information about the invocation, function, and runtime environment.
    :return: A dict with 'statusCode' and 'body' for API Gateway.
    """
    print("Received event:", event)
    
    return {
        "statusCode": 200,
        "body": "Hello from Lambda!"
    }
