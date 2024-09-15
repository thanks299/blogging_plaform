"""empty message

Revision ID: 175343184b43
Revises: 01535903a3ee
Create Date: 2024-09-15 23:43:53.156701

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '175343184b43'
down_revision = '01535903a3ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_posted', sa.DateTime(), nullable=False, server_default=sa.func.now()))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_column('date_posted')

    # ### end Alembic commands ###
