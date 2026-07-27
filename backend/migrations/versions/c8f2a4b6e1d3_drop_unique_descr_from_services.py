"""drop_unique_descr_from_services

Revision ID: c8f2a4b6e1d3
Revises: 4e14d913f0f6
Create Date: 2026-07-26 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'c8f2a4b6e1d3'
down_revision: Union[str, None] = '4e14d913f0f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ru_descr/en_descr случайно унаследовали unique=True от title_ru/title_en —
    # у двух разных услуг не может быть одинакового описания, что не является
    # осмысленным ограничением и приводило к IntegrityError при создании услуг
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.drop_constraint('services_ru_descr_key', type_='unique')
        batch_op.drop_constraint('services_en_descr_key', type_='unique')


def downgrade() -> None:
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.create_unique_constraint('services_ru_descr_key', ['ru_descr'])
        batch_op.create_unique_constraint('services_en_descr_key', ['en_descr'])
