# Deployment Runbook

## First install

1. Clone this repo to `/opt/live-demo-infra`.
2. Copy `.env.example` to `.env` and set image tags, local ports, and artifact mount paths.
3. Place Cloudflare tunnel credentials under `/etc/cloudflared`; never commit them.
4. Copy `cloudflared/config.example.yml` to `/etc/cloudflared/live-demo-config.yml` and adjust the credentials path.
5. Install the systemd units from `systemd/` and enable them.

```bash
sudo systemctl enable --now live-demo-compose.service
sudo systemctl enable --now cloudflared-live-demo.service
```

## Update

```bash
cd /opt/live-demo-infra
docker compose pull
docker compose up -d --remove-orphans
curl -fsS http://127.0.0.1:8011/health/ready
curl -fsS http://127.0.0.1:8012/health/ready
```

## Rollback

1. Set `FASHION_API_IMAGE` or `SQUAT_API_IMAGE` in `.env` to the previous GHCR tag.
2. Run `docker compose up -d --remove-orphans`.
3. Verify `/health/live`, `/health/ready`, and `/model-info` locally.

## Cloudflare Controls

- Route only `fashion-api.obadaalsehli.com` and `squat-api.obadaalsehli.com`.
- Keep UN1290 host ports bound to `127.0.0.1`.
- Add WAF/rate limiting: 10 requests per minute per IP per API hostname.
- Match upload limits: 10 MB for fashion images, 50 MB for squat videos.
- Enforce HTTPS-only traffic.

