# Artifact Placement Runbook

Model and media artifacts live on UN1290 volumes, not in git or Docker images.

## Fashion

```text
/models/fashion/v1/metadata.json
/models/fashion/v1/manifest.json
/models/fashion/v1/model.pt
/models/fashion/v1/dinov2/
/models/fashion/current -> /models/fashion/v1
```

`manifest.json` must list every required artifact with SHA256 checksums and the expected label maps. The local DINOv2 checkout is required for network-free startup.

## Squat

```text
/models/squat/v1/metadata.json
/models/squat/v1/manifest.json
/models/squat/v1/pose_landmarker.task
/models/squat/current -> /models/squat/v1
/data/squat/samples
```

`manifest.json` must set `model_type` to `mediapipe_pose_landmarker` and include the SHA256 checksum for `pose_landmarker.task`.

## Verification

```bash
curl -fsS http://127.0.0.1:8011/model-info
curl -fsS http://127.0.0.1:8011/health/ready
curl -fsS http://127.0.0.1:8012/model-info
curl -fsS http://127.0.0.1:8012/health/ready
```

