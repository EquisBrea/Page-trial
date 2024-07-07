from flask import jsonify, request
from app.models import Contact


def index():
    return jsonify({'message': 'Back end is working'})

def get_all_contacts():
    contacts = Contact.get_all()
    return jsonify([contact.serialize() for contact in contacts])

def get_contact(id):
    contact = Contact.get_by_id(id)
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404
    
    return jsonify(contact.serialize())


def create_contact():
    data = request.json
    new_contact = Contact(apellido=data['apellido'], nombre=data['nombre'],
                          mail=data['mail'], comentario=data['comentario'])
    new_contact.save()
    return jsonify({'message': 'Contact created successfully'}), 201

def update_contact(id):
    contact = Contact.get_by_id(id)
    
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404
    
    data = request.json
    
    contact.appellido = data['apellido']
    contact.nombre = data['nombre']
    contact.mail = data['mail']
    contact.comentario = data['comentario']
    
    contact.save()
    
    return jsonify({'message': 'Contact updated successfully'})

def delete_contact(id):
    contact = Contact.get_by_id(id)
    
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404
    
    contact.delete()
    return jsonify({'message': 'Contact deleted successfully'})