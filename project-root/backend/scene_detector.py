import torch
from torch.hub import load
from transnetv2 import predict_video

# Load TransNet V2 model for scene detection
def load_model():
    model = load('mitmul/TransNetV2', 'transnetv2', pretrained=True)
    model.eval()
    return model

_model = load_model()

def detect_scenes(video_path: str) -> list[tuple[float, float]]:
    """
    Detect scene boundaries in a video.
    Returns a list of (start_time, end_time) in seconds.
    """
    # predict_video expects millisecond inputs
    result = predict_video(video_path, _model)
    # result is list of (start_ms, end_ms)
    scenes = [(start / 1000.0, end / 1000.0) for start, end in result]
    return scenes