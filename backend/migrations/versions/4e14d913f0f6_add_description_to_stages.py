"""add_description_to_stages

Revision ID: 4e14d913f0f6
Revises: bbf32c131016
Create Date: 2026-07-24 00:10:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = '4e14d913f0f6'
down_revision: Union[str, None] = 'bbf32c131016'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # no-op: колонки 'ru_descr'/'en_descr' уже создаются в 972b6cf434ce_stages_descr_to_array —
    # задублировались здесь из-за рассинхронизации локальной SQLite-базы с историей миграций
    pass


def downgrade() -> None:
    # no-op: см. upgrade
    pass
