#!/bin/bash
# ==============================================================================
# Automated Daily Database & Media Backup Script: Dr. Musheer Ahmad Portfolio
# Cron schedule recommendation: 0 3 * * * (Every night at 03:00 AM)
# ==============================================================================

set -e

BACKUP_DIR="/app/backend/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/daily_backup_${TIMESTAMP}.zip"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting daily portfolio backup..."
python manage.py export_full_backup --output-dir="${BACKUP_DIR}"

# Keep only the last 30 daily backups (prune backups older than 30 days)
find "${BACKUP_DIR}" -type f -name "dr_musheer_ahmad_portfolio_backup_*.zip" -mtime +30 -delete

echo "[$(date)] Daily backup completed successfully."
