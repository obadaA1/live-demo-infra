# Live Demo Infra

Deployment orchestration for the portfolio live demo APIs on UN1290.

This repo owns Docker Compose, Cloudflare Tunnel templates, systemd unit examples, and runbooks. It intentionally does not contain model weights, media samples, tunnel credentials, secrets, or local `.env` files.

## Services

- `fashion-api.obadaalsehli.com` -> `http://127.0.0.1:8011`
- `squat-api.obadaalsehli.com` -> `http://127.0.0.1:8012`

## Production Defaults

- GHCR images only; no source builds on the server.
- Host ports bind to `127.0.0.1`.
- Cloudflare Tunnel is the only public ingress.
- Containers run with a read-only root filesystem and dropped capabilities.
- Model artifacts mount read-only from `/models/.../current`.
- Upload limits are enforced at the frontend, API, and Cloudflare WAF layer.

See `runbooks/deployment.md` and `runbooks/artifacts.md` for operational steps.

