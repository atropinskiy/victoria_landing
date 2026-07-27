"""add_role_to_user

Revision ID: ee0d5d5b0005
Revises: 669f09f02bfc
Create Date: 2026-07-13 11:30:36.404079

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'ee0d5d5b0005'
down_revision: Union[str, None] = '669f09f02bfc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # no-op: колонка 'role' уже создаётся в 669f09f02bfc_init — тот же столбец
    # оказался задублирован в этой миграции при автогенерации
    pass


def downgrade() -> None:
    # no-op: см. upgrade — столбец 'role' удаляется через downgrade init-миграции
    pass
