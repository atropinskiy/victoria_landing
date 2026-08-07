"""add_cases

Revision ID: 65eba779b4f2
Revises: d85bbd944fc6
Create Date: 2026-08-07 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '65eba779b4f2'
down_revision: Union[str, None] = 'd85bbd944fc6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'cases',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title_ru', sa.String(), nullable=True),
        sa.Column('title_en', sa.String(), nullable=True),
        sa.Column('ru_descr', sa.String(), nullable=True),
        sa.Column('en_descr', sa.String(), nullable=True),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('image', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_cases_id'), 'cases', ['id'], unique=False)
    op.create_index(op.f('ix_cases_title_ru'), 'cases', ['title_ru'], unique=True)
    op.create_index(op.f('ix_cases_title_en'), 'cases', ['title_en'], unique=True)


def downgrade() -> None:
    op.drop_index(op.f('ix_cases_title_en'), table_name='cases')
    op.drop_index(op.f('ix_cases_title_ru'), table_name='cases')
    op.drop_index(op.f('ix_cases_id'), table_name='cases')
    op.drop_table('cases')
