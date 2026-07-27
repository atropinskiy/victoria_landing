"""drop_categories_link

Revision ID: bbf32c131016
Revises: 5123d15edb58
Create Date: 2026-07-24 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'bbf32c131016'
down_revision: Union[str, None] = '5123d15edb58'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.drop_constraint('services_category_id_fkey', type_='foreignkey')
        batch_op.drop_column('category_id')

    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_categories_id'))

    op.drop_table('categories')


def downgrade() -> None:
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ru_descr', sa.String(), nullable=True),
    sa.Column('en_descr', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('en_descr'),
    sa.UniqueConstraint('ru_descr')
    )
    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_categories_id'), ['id'], unique=False)

    with op.batch_alter_table('services', schema=None) as batch_op:
        # Существующие услуги не привязаны ни к одной категории — поэтому nullable=True,
        # а не NOT NULL, как было изначально.
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            'services_category_id_fkey', 'categories', ['category_id'], ['id'], ondelete='CASCADE'
        )
