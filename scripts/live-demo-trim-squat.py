from pathlib import Path

import cv2

src = Path("/input/annotated_squat (4).mp4")
out = Path("/output/squat-smoke.mp4")

capture = cv2.VideoCapture(str(src))
if not capture.isOpened():
    raise SystemExit(f"could not open {src}")

fps = capture.get(cv2.CAP_PROP_FPS) or 30.0
width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
max_frames = int(min(240, fps * 8))

writer = cv2.VideoWriter(
    str(out),
    cv2.VideoWriter_fourcc(*"mp4v"),
    fps,
    (width, height),
)

frames = 0
while frames < max_frames:
    ok, frame = capture.read()
    if not ok:
        break
    writer.write(frame)
    frames += 1

capture.release()
writer.release()

print({"frames": frames, "fps": fps, "output": str(out), "bytes": out.stat().st_size})
