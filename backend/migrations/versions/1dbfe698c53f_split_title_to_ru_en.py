"""split_title_to_ru_en

Revision ID: 1dbfe698c53f
Revises: fefd222fefd7
Create Date: 2026-08-03 11:21:14.659740

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '1dbfe698c53f'
down_revision: Union[str, None] = 'fefd222fefd7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('tests', sa.Column('title_ru', sa.String(), nullable=True))
    op.add_column('tests', sa.Column('title_en', sa.String(), nullable=True))
    op.execute("UPDATE tests SET title_ru = title, title_en = title")
    op.alter_column('tests', 'title_ru', nullable=False)
    op.alter_column('tests', 'title_en', nullable=False)
    op.drop_column('tests', 'title')

    op.add_column('test_categories', sa.Column('title_ru', sa.String(), nullable=True))
    op.add_column('test_categories', sa.Column('title_en', sa.String(), nullable=True))
    op.execute("UPDATE test_categories SET title_ru = title, title_en = title")
    op.alter_column('test_categories', 'title_ru', nullable=False)
    op.alter_column('test_categories', 'title_en', nullable=False)
    op.drop_column('test_categories', 'title')


def downgrade() -> None:
    op.add_column('test_categories', sa.Column('title', sa.String(), nullable=True))
    op.execute("UPDATE test_categories SET title = title_ru")
    op.alter_column('test_categories', 'title', nullable=False)
    op.drop_column('test_categories', 'title_en')
    op.drop_column('test_categories', 'title_ru')

    op.add_column('tests', sa.Column('title', sa.String(), nullable=True))
    op.execute("UPDATE tests SET title = title_ru")
    op.alter_column('tests', 'title', nullable=False)
    op.drop_column('tests', 'title_en')
    op.drop_column('tests', 'title_ru')
