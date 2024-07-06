from flask import jsonify
from app.views import *

def get_contact(contact_id):
    contact = {
    'id_contact':contact_id,    
    }
    return jsonify(contact)

def create_contact():
    #datos recibidos en formato json
    data = request.json
    return jsonify({'message': 'Movie created successfully','data':data}), 201

def update_contact(contact_id):
    #datos recibidos en formato json
    data = request.json
    return jsonify({'message': 'Contact updated successfully', 'data':data,'id':contact_id})

def delete_contact(contact_id):
    return jsonify({'message': 'Movie deleted successfully' , 'id':contact_id})