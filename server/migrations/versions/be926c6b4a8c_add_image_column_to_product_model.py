"""add image column to Product model

Revision ID: be926c6b4a8c
Revises: c04cda6bda8d
Create Date: 2023-10-07 17:48:37.602157

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be926c6b4a8c'
down_revision = 'c04cda6bda8d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
