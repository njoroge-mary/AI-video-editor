import os
from flask import Flask, request, jsonify
from celeryconfig import celery_app
import boto3
from payments import stripe_bp

dotenv.load_dotenv()
app = Flask(__name__)
s3 = boto3.client('s3')
app.register_blueprint(stripe_bp, url_prefix='/payments')

@app.route('/upload', methods=['POST'])
def upload_video():
    file = request.files['file']
    key = f"videos/{file.filename}"
    s3.upload_fileobj(file, os.getenv('S3_BUCKET_NAME'), key)
    return jsonify({'s3_key': key})

@app.route('/detect-scenes', methods=['POST'])
def detect_scenes_route():
    s3_key = request.json['s3_key']
    job = scene_detection_task.delay(s3_key)
    return jsonify({'task_id': job.id}), 202

@app.route('/task-status/<task_id>')
def task_status(task_id):
    res = celery_app.AsyncResult(task_id)
    if res.state == 'SUCCESS':
        return jsonify({'state': res.state, 'result': res.result})
    return jsonify({'state': res.state}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)