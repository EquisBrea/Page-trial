from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import index, create_contact, get_all_contacts, get_contact, update_contact,delete_contact

app = Flask (__name__)


app.route('/', methods=['GET'])(index)
app.route('/api/contacts/', methods=['POST'])(create_contact)
app.route('/api/contacts/', methods=['GET'])(get_all_contacts)
app.route('/api/contacts/<int:id>', methods=['GET'])(get_contact)
app.route('/api/contacts/<int:id>', methods=['PUT'])(update_contact)
app.route('/api/contacts/<int:id>', methods=['DELETE'])(delete_contact)

init_app(app)

CORS(app)

if __name__=='__main__':
    app.run(debug=True)