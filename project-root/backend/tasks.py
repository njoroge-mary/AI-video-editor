from celeryconfig import celery_app
from scene_detector import detect_scenes
from effects import apply_effects
import boto3, os, ffmpeg

s3 = boto3.client('s3')
BUCKET = os.getenv('S3_BUCKET_NAME')

@celery_app.task(bind=True)
def scene_detection_task(self, s3_key):
    local_input = f"/tmp/{os.path.basename(s3_key)}"
    s3.download_file(BUCKET, s3_key, local_input)
    scenes = detect_scenes(local_input)
    return scenes

@celery_app.task(bind=True)
def effects_task(self, s3_key, effect_params):
    local_input = f"/tmp/{os.path.basename(s3_key)}"
    local_output = f"/tmp/processed_{os.path.basename(s3_key)}"
    s3.download_file(BUCKET, s3_key, local_input)
    # Apply effects pipeline
    apply_effects(local_input, local_output, effect_params)
    s3.upload_file(local_output, BUCKET, f"processed/{os.path.basename(local_output)}")
    return f"processed/{os.path.basename(local_output)}"