from flask import Flask
from app.database import init_app
from app.views import *

app = Flask (__name__)

app.route('/api/movies/', methods=['POST'])(create_contact)
app.route('/api/movies/<int:movie_id>', methods=['GET'])(get_contact)
app.route('/api/movies/<int:movie_id>', methods=['PUT'])(update_contact)
app.route('/api/movies/<int:movie_id>', methods=['DELETE'])(delete_contact)

init_app(app)

