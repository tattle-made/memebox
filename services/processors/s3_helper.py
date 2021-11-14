from dotenv import load_dotenv
load_dotenv()
import os
import boto3
import botocore

def initialize_s3():

    """
    Setup the s3 bucket and returns the aws-base-url,bucket-name ,aws-s3 object and aws-resource object
    Args:
        None
    Returns:
        aws base url,aws bucket,s3 bucket object,s3 resource object
    """
    
    aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
    aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY_ID")
    aws_username = os.environ.get("AWS_USERNAME")
    aws_bucket = os.environ.get("AWS_BUCKET")
    s3_client = boto3.client("s3", aws_access_key_id = aws_access_key_id,
                          aws_secret_access_key= aws_secret_access_key) 

    s3_resource = boto3.resource('s3', aws_access_key_id = aws_access_key_id,
                          aws_secret_access_key= aws_secret_access_key)

    #print(list(s3_resource.buckets.all()))
    #ogbv_bucket = s3_resource.Bucket(aws_bucket) #Find the list of files stored in the given bucket
    #print(ogbv_bucket.objects.all())

    return aws_username, aws_bucket, s3_client, s3_resource

def upload_to_s3(s3,file,filename,bucket,content_type):

    """
    Upload the images/videos to s3-bucket
    Args:
        s3 (s3 client object) 
        file (.jpg/.mp4) - file to upload
        filename - filename to store an uploaded file on s3 (or) Key
        bucket - aws s3 bucket name
        content_type - type of the data
    Returns:
        None
    """

    with open(file,"rb") as data:
        s3.upload_fileobj(Fileobj = data,
                          Bucket = bucket,
                          Key = filename,
                          ExtraArgs = {'ContentType':content_type,
                                       'ACL':'public-read'})

def count_s3_files(s3, bucket):

    """
    Count the no. of files in the s3 bucket
    
    Args:
        s3 - s3 client object
        bucket (str) - s3 bucket name
    Returns:
        file_count (int) - count of files
    """

    paginator = s3.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket=bucket)
    file_count = 0
    for page in pages:
        for obj in page['Contents']:
            file_count += 1
    return file_count

def get_s3_url(aws_bucket,key):

    """
    Get the s3-url of the uploaded image/video
    Args:
        aws_bucket (str) - name of the s3 bucket
        key - filename stored on s3 bucket
    Returns:
        object_url - s3 url of the uploaded image/video
    """

    config = botocore.client.Config(region_name = 'ap-south-1',signature_version = botocore.UNSIGNED)
    object_url = boto3.client('s3', config=config).generate_presigned_url('get_object', ExpiresIn=0, Params={'Bucket': aws_bucket, 'Key': key})
    #print(object_url)
    return object_url