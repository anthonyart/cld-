# Deploying via SSH

The deploy path this kit teaches on purpose has few moving parts: `rsync` the app to a server,
run it under `systemd`. No Docker, no CI pipeline, no orchestration required to get a real app
live. Swap in something fancier later once you actually need it.

## Prerequisites

- A VPS or server you can reach over SSH (Ubuntu/Debian assumed below; adjust package manager
  commands for other distros).
- An SSH key already authorized on that server.
- Node.js >= 18 installed on the server (`node --version` to check;
  [nodesource](https://github.com/nodesource/distributions) or your distro's package manager to
  install it).

## One-time server setup

Run these once per server, not once per deploy.

**1. Create a dedicated deploy user** (don't deploy as root):

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo mkdir -p /opt/claude-code-starter-app
sudo chown deploy:deploy /opt/claude-code-starter-app
# Copy your local public key into the new user's authorized_keys so `ssh deploy@host` works:
ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@example.com
```

**2. Let `deploy` restart the service without a password prompt** — `scripts/deploy.sh` calls
`sudo systemctl restart myapp` over SSH, so add a narrow sudoers rule:

```bash
echo "deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart myapp, /usr/bin/systemctl status myapp" \
  | sudo tee /etc/sudoers.d/deploy-myapp
```

**3. Install the systemd unit** — copy `deploy/myapp.service` to the server, edit
`User`/`WorkingDirectory` if you changed the path or user, then:

```bash
sudo cp deploy/myapp.service /etc/systemd/system/myapp.service
sudo systemctl daemon-reload
sudo systemctl enable myapp   # starts on boot; first `start` happens on first deploy
```

**4. Open the firewall** for SSH and whatever port the app/proxy uses:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 3000/tcp   # or 80/443 if you're fronting it with nginx (see below)
sudo ufw enable
```

**5. (Optional) Put nginx in front** for a normal `:80`/`:443` URL and TLS, instead of exposing
Node's port directly. See `deploy/nginx.conf.example` — copy it, edit `server_name`, enable it,
then `sudo certbot --nginx -d example.com` for a free TLS cert.

## Deploying

Every deploy after the one-time setup is just:

```bash
REMOTE_HOST=example.com REMOTE_USER=deploy ./scripts/deploy.sh
```

That script:
1. `rsync`s `app/` to `REMOTE_PATH` (default `/opt/claude-code-starter-app`) over SSH.
2. Restarts the `myapp` systemd service.
3. Curls `/api/health` on the server to confirm it came back up.

Override any of `REMOTE_HOST`, `REMOTE_USER`, `REMOTE_PATH`, `SERVICE_NAME`, `PORT` as env vars if
your setup differs from the defaults.

This script is a manual, human-run step by design — Claude Code won't run it unprompted, since it
touches a real, shared server.

## When something goes wrong

- **Health check fails after deploy**: `ssh deploy@example.com 'sudo journalctl -u myapp -n 50'`
  to see why the service didn't come up (missing Node, port already in use, bad `Environment=`
  value, etc).
- **`sudo: a password is required`**: the sudoers rule in step 2 above didn't take, or the
  commands in it don't match exactly what `deploy.sh` runs — they must match verbatim.
- **Rollback**: this flow doesn't keep server-side history by itself. Tag releases in git
  (`git tag v0.2.0`) and `git checkout <tag>` locally before re-running `deploy.sh` to roll back,
  or keep your own snapshot/backup strategy on the server for anything you can't just rebuild
  from git.

## Adapting this for your own app

Once you replace `app/` with your real project:
- Update `deploy/myapp.service`'s `WorkingDirectory` and `ExecStart` to match your entry point
  and, if you have dependencies, run `npm ci --omit=dev` on the server before `systemctl start`
  (or vendor `node_modules` into the rsync if you'd rather not build on the server).
- Update `REMOTE_PATH`/`SERVICE_NAME` in how you invoke `scripts/deploy.sh` (or edit its
  defaults) to match.
- If your app needs secrets, put them in an `.env` file on the server only (never rsync'd — it's
  excluded in `deploy.sh`) and uncomment `EnvironmentFile=` in the systemd unit.
