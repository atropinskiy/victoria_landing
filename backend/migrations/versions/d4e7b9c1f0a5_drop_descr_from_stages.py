"""drop_descr_from_stages

Revision ID: d4e7b9c1f0a5
Revises: c8f2a4b6e1d3
Create Date: 2026-07-26 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'd4e7b9c1f0a5'
down_revision: Union[str, None] = 'c8f2a4b6e1d3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('stages', schema=None) as batch_op:
        batch_op.drop_column('en_descr')
        batch_op.drop_column('ru_descr')


def downgrade() -> None:
    with op.batch_alter_table('stages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ru_descr', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('en_descr', sa.String(), nullable=True))
