from app.database import get_db

class Contact:
    def __init__(self, id=None, apellido=None, nombre=None, mail=None, comentario=None, leido=None):
        self.id = id
        self.apellido = apellido
        self.nombre = nombre
        self.mail = mail
        self.comentario = comentario
        self.leido = leido
        
@staticmethod
def get_all():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()
    contacts = [Contact(id=row[0], apellido=row[1], nombre=row[2], mail=row[3], comentario=row[4], leido=row[5]) for row in rows]
    cursor.close()
    return contacts

@staticmethod
def get_by_id(contact_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (contact_id,))
    row = cursor.fetchone()
    cursor.close()
    if row:
        return Contact(id=row[0], apellido=row[1], nombre=row[2], mail=row[3], comentario=row[4], leido=row[5])
    
def save(self):
    db = get_db()
    cursor = db.cursor()
    if self.id:
        cursor.execute("""
            UPDATE users SET apellido = %s, nombre = %s, mail = %s, comentario = %s, leido = %s
            WHERE id = %s
        """, (self.apellido, self.nombre, self.mail, self.comentario, self.leido, self.id))
    else:
        cursor.execute("""
            INSERT INTO users (apellido, nombre, mail, comentario, leido) VALUES (%s, %s, %s, %s,%s)
        """, (self.apellido, self.nombre, self.mail, self.comentario, self.leido))
        self.id = cursor.lastrowid
        
    db.commit()
    cursor.close()