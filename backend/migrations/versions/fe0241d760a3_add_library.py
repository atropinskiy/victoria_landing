"""add_library

Revision ID: fe0241d760a3
Revises: 65eba779b4f2
Create Date: 2026-08-07 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'fe0241d760a3'
down_revision: Union[str, None] = '65eba779b4f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'library',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title_ru', sa.String(), nullable=True),
        sa.Column('title_en', sa.String(), nullable=True),
        sa.Column('ru_descr', sa.String(), nullable=True),
        sa.Column('en_descr', sa.String(), nullable=True),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('image', sa.String(), nullable=True),
        sa.Column('document', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_library_id'), 'library', ['id'], unique=False)
    op.create_index(op.f('ix_library_title_ru'), 'library', ['title_ru'], unique=True)
    op.create_index(op.f('ix_library_title_en'), 'library', ['title_en'], unique=True)


def downgrade() -> None:
    op.drop_index(op.f('ix_library_title_en'), table_name='library')
    op.drop_index(op.f('ix_library_title_ru'), table_name='library')
    op.drop_index(op.f('ix_library_id'), table_name='library')
    op.drop_table('library')
