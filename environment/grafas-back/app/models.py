from app.database import get_db

class Contact:
    def __init__(self, id=None, apellido=None, nombre=None, mail=None, comentario=None):
        self.id = id
        self.apellido = apellido
        self.nombre = nombre
        self.mail = mail
        self.comentario = comentario

        
    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()
        contacts = [Contact(id=row[0], apellido=row[1], nombre=row[2], mail=row[3], comentario=row[4]) for row in rows]
        cursor.close()
        return contacts

    @staticmethod
    def get_by_id(id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Contact(id=row[0], apellido=row[1], nombre=row[2], mail=row[3], comentario=row[4])
        return None
    
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id:
            cursor.execute("""
                UPDATE users SET apellido = %s, nombre = %s, mail = %s, comentario = %s
                WHERE id = %s
            """, (self.apellido, self.nombre, self.mail, self.comentario, self.id))
        else:
            cursor.execute("""
                INSERT INTO users (apellido, nombre, mail, comentario) VALUES (%s, %s, %s, %s)
            """, (self.apellido, self.nombre, self.mail, self.comentario))
            self.id = cursor.lastrowid

        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM users WHERE id = %s", (self.id,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id': self.id,
            'apellido': self.apellido,
            'nombre': self.nombre,
            'mail': self.mail,
            'comentario': self.comentario,
            }