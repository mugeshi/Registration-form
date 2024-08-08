import secrets
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

#Initialize the Flask application
app = Flask(__name__) 

#@app.route('/')
#def home():
 #   return 'Hello, World!'


#Generate a random secrete key for session management
app.config['SECRET_KEY'] = secrets.token_hex(32)# Generate a 64-character hexadecimal string


#Configure the sqlalchemy part of the app instance
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

#Create an sqlachemy database object
db = SQLAlchemy(app)

#Create a Bcrypt object for hashing password
bcrypt = Bcrypt(app)

#Define the User model (table schema)
class User(db.Model):
    # Primary key column
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)



# Create the database and the User table inside an application context
with app.app_context():
    db.create_all()

@app.route('/api/signup', methods=['POST'])
def signup():
     # Get the JSON data from the request
    data = request.get_json()

    #Hash the password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    #Create a new User object
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)

    # Add the new user to the session
    db.session.add(new_user)

    # Commit the session (save the new user to the database)
    db.session.commit()

    # Return a success message as JSON with a 201 status code
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    # Query the User table for a user with the provided email
    user = User.query.filter_by(email=data['email']).first()
    # Check if the user exists and if the password matches
    if user and bcrypt.check_password_hash(user.password, data['password']):
        # Return a success message as JSON with a 200 status code
        return jsonify({'message': 'Login successful'}), 200
    else:
        # Return an error message as JSON with a 401 status code
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(debug=True)





    





