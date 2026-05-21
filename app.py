from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__) 


# DATABASE SQLITE
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# TABEL IKAN
class Fish(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    price = db.Column(db.String(100))
    image = db.Column(db.String(200))
    desc = db.Column(db.Text)
    size = db.Column(db.String(50))
    temp = db.Column(db.String(50))
    ph = db.Column(db.String(50))
    badge = db.Column(db.String(50))
    category = db.Column(db.String(50))

@app.route('/api/fish')
def get_fish():
   

    fishes = Fish.query.all()

    result = []

    for fish in fishes:

        result.append({
            'id': fish.id,
            'name': fish.name,
            'price': fish.price
        })

    return jsonify(result)
    return render_template('index.html')


if __name__ == '__main__':

    with app.app_context():
        db.create_all()

    app.run(debug=True)