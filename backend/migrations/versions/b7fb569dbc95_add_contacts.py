"""add_contacts

Revision ID: b7fb569dbc95
Revises: ed131959b050
Create Date: 2026-08-12 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'b7fb569dbc95'
down_revision: Union[str, None] = 'ed131959b050'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'contacts_content',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('address_ru', sa.Text(), nullable=False),
        sa.Column('address_en', sa.Text(), nullable=False),
        sa.Column('hours_ru', sa.Text(), nullable=False),
        sa.Column('hours_en', sa.Text(), nullable=False),
        sa.Column('map_url', sa.String(), server_default='', nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.CheckConstraint('id = 1', name='contacts_content_singleton'),
    )

    contacts_content = sa.table(
        'contacts_content',
        sa.column('id', sa.Integer),
        sa.column('email', sa.String),
        sa.column('phone', sa.String),
        sa.column('address_ru', sa.Text),
        sa.column('address_en', sa.Text),
        sa.column('hours_ru', sa.Text),
        sa.column('hours_en', sa.Text),
        sa.column('map_url', sa.String),
    )
    op.bulk_insert(
        contacts_content,
        [
            {
                'id': 1,
                'email': '',
                'phone': '',
                'address_ru': '',
                'address_en': '',
                'hours_ru': '',
                'hours_en': '',
                'map_url': '',
            }
        ],
    )


def downgrade() -> None:
    op.drop_table('contacts_content')
