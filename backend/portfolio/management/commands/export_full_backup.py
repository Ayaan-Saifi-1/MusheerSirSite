import os
import zipfile
import shutil
from datetime import datetime
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from django.core import management

class Command(BaseCommand):
    help = "Exports a complete backup of the database and media assets as a zip archive."

    def add_arguments(self, parser):
        parser.add_argument(
            '--output-dir',
            type=str,
            default='backups',
            help='Directory to write the backup archive'
        )

    def handle(self, *args, **options):
        output_dir = Path(options['output_dir'])
        output_dir.mkdir(parents=True, exist_ok=True)

        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        archive_name = f"dr_musheer_ahmad_portfolio_backup_{timestamp}.zip"
        archive_path = output_dir / archive_name

        temp_dir = output_dir / f"temp_{timestamp}"
        temp_dir.mkdir(parents=True, exist_ok=True)

        try:
            self.stdout.write("Dumping database JSON fixture...")
            db_dump_file = temp_dir / "database_dump.json"
            with open(db_dump_file, 'w', encoding='utf-8') as f:
                management.call_command('dumpdata', 'portfolio', indent=2, stdout=f)

            # Copy media files if present
            media_root = Path(settings.MEDIA_ROOT)
            temp_media = temp_dir / "media"
            if media_root.exists():
                self.stdout.write("Copying media uploads (portraits, cv, documents)...")
                shutil.copytree(media_root, temp_media, dirs_exist_ok=True)

            self.stdout.write(f"Compressing into zip archive: {archive_path}...")
            with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for root, dirs, files in os.walk(temp_dir):
                    for file in files:
                        file_path = Path(root) / file
                        arcname = file_path.relative_to(temp_dir)
                        zipf.write(file_path, arcname)

            file_size_mb = archive_path.stat().st_size / (1024 * 1024)
            self.stdout.write(self.style.SUCCESS(
                f"Successfully generated full portfolio backup: {archive_path} ({file_size_mb:.2f} MB)"
            ))

        finally:
            if temp_dir.exists():
                shutil.rmtree(temp_dir)
