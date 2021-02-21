import boto3
import botocore

def upload_file(file_location, file_name, bucket):
    """
    Function to upload a file to an S3 bucket
    """
    object_name = file_name
    s3_client = boto3.client('s3')
    response = s3_client.upload_file(file_location, bucket, object_name)

    return response


def download_file(file_name, bucket):
    """
    Function to download a given file from an S3 bucket
    """
    s3 = boto3.resource('s3')
    output = f"/resume-review/downloads/{file_name}"
    print(file_name)
    print(output)
    try:
        s3.meta.client.download_file(bucket, file_name, output)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            raise Exception("The object does not exist.")
        else:
            raise
    return output
