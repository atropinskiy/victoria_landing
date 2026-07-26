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
    with op.batch_alter_table('stages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ru_descr', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('en_descr', sa.String(), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table('stages', schema=None) as batch_op:
        batch_op.drop_column('en_descr')
        batch_op.drop_column('ru_descr')
