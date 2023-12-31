"""add product, price, and wishlist models

Revision ID: 3f6661f3f05a
Revises: ba3665802087
Create Date: 2023-10-02 19:12:36.520684

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3f6661f3f05a'
down_revision = 'ba3665802087'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('current_price', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wishlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('prices',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_prices_product_id_products')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wishlist_products',
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('wishlist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_wishlist_products_product_id_products')),
    sa.ForeignKeyConstraint(['wishlist_id'], ['wishlists.id'], name=op.f('fk_wishlist_products_wishlist_id_wishlists')),
    sa.PrimaryKeyConstraint('product_id', 'wishlist_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wishlist_products')
    op.drop_table('prices')
    op.drop_table('wishlists')
    op.drop_table('products')
    # ### end Alembic commands ###
