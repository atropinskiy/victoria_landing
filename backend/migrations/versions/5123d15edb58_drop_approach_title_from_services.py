"""drop_approach_title_from_services

Revision ID: 5123d15edb58
Revises: a07fdb762a70
Create Date: 2026-07-23 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = '5123d15edb58'
down_revision: Union[str, None] = 'a07fdb762a70'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.drop_column('appr_title_en')
        batch_op.drop_column('appr_title_ru')


def downgrade() -> None:
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.add_column(sa.Column('appr_title_ru', sa.String(), nullable=False, server_default=''))
        batch_op.add_column(sa.Column('appr_title_en', sa.String(), nullable=False, server_default=''))
