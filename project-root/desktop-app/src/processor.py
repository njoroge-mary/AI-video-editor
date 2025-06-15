import sys
from scene_detector import detect_scenes
from effects import apply_effects

if __name__ == '__main__':
    video_path = sys.argv[1]
    scenes = detect_scenes(video_path)
    # Example: apply default effects to first segment
    if scenes:
        start, end = scenes[0]
        output_path = video_path.replace('.', '_edited.')
        apply_effects(video_path, output_path, {'brightness':0.1, 'contrast':1.2, 'saturation':1.1, 'filters':['vignette']})
        print(f"Processed segment 0: {start}-{end}, output saved to {output_path}")
    else:
        print("No scenes detected.")