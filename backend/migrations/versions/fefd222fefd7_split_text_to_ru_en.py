"""split_text_to_ru_en

Revision ID: fefd222fefd7
Revises: 3c4ae1a4d8fe
Create Date: 2026-08-03 11:07:44.613901

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'fefd222fefd7'
down_revision: Union[str, None] = '3c4ae1a4d8fe'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('test_questions', sa.Column('text_ru', sa.String(), nullable=True))
    op.add_column('test_questions', sa.Column('text_en', sa.String(), nullable=True))
    op.execute("UPDATE test_questions SET text_ru = text, text_en = text")
    op.alter_column('test_questions', 'text_ru', nullable=False)
    op.alter_column('test_questions', 'text_en', nullable=False)
    op.drop_column('test_questions', 'text')

    op.add_column('test_options', sa.Column('text_ru', sa.String(), nullable=True))
    op.add_column('test_options', sa.Column('text_en', sa.String(), nullable=True))
    op.execute("UPDATE test_options SET text_ru = text, text_en = text")
    op.alter_column('test_options', 'text_ru', nullable=False)
    op.alter_column('test_options', 'text_en', nullable=False)
    op.drop_column('test_options', 'text')


def downgrade() -> None:
    op.add_column('test_options', sa.Column('text', sa.String(), nullable=True))
    op.execute("UPDATE test_options SET text = text_ru")
    op.alter_column('test_options', 'text', nullable=False)
    op.drop_column('test_options', 'text_en')
    op.drop_column('test_options', 'text_ru')

    op.add_column('test_questions', sa.Column('text', sa.String(), nullable=True))
    op.execute("UPDATE test_questions SET text = text_ru")
    op.alter_column('test_questions', 'text', nullable=False)
    op.drop_column('test_questions', 'text_en')
    op.drop_column('test_questions', 'text_ru')
