import os
import mysql.connector
from mysql.connector import Error
from flask import g, current_app
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

DATABASE_CONFIG = {
'user': os.getenv('DB_USERNAME'),
'password': os.getenv('DB_PASSWORD'),
'host': os.getenv('DB_HOST'),
'database': os.getenv('DB_NAME'),
'port': os.getenv('DB_PORT', 3406)
}
try:
    conn = mysql.connector.connect(**DATABASE_CONFIG)
    if conn.is_connected():
        print("Successfully connected to the database")
        conn.close()
    else:
        print("Failed to connect to the database")
except Error as e:
    print(f"Error: {e}")