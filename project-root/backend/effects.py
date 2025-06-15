import ffmpeg
from typing import Dict, Any

def apply_effects(input_path: str, output_path: str, params: Dict[str, Any]) -> None:
    """
    Apply color correction and filters to a video.
    params may include:
      - brightness: float (-1.0 to 1.0)
      - contrast: float (0.0 to 2.0)
      - saturation: float (0.0 to 2.0)
      - filters: list of filter names (e.g., ['vignette', 'hue'])
    """
    stream = ffmpeg.input(input_path)

    # Color adjustments
    if any(k in params for k in ('brightness', 'contrast', 'saturation')):
        brightness = params.get('brightness', 0)
        contrast = params.get('contrast', 1)
        saturation = params.get('saturation', 1)
        stream = stream.filter('eq', brightness=brightness, contrast=contrast, saturation=saturation)

    # Custom filters
    for f in params.get('filters', []):
        if f == 'vignette':
            stream = stream.filter('vignette')
        elif f == 'hue':
            h = params.get('hue', 0)
            stream = stream.filter('hue', h=h)

    # Output video
    (
        stream
        .output(output_path, **{'c:v': 'libx264', 'preset': 'fast'})
        .overwrite_output()
        .run()
    )