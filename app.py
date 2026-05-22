from flask import Flask, render_template, jsonify, request
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

# HALAMAN UTAMA
@app.route('/')
def home():
    return render_template('index.html')

# TAMBAH DATA IKAN
@app.route('/tambah')
def tambah():

    ikan1 = Fish(
        name='Channa Barca',
        price='150000',
        image='img/channa.jpg',
        desc='Ikan predator premium dengan warna eksotis.',
        size='30 cm',
        temp='26-30°C',
        ph='6.5-7.5',
        badge='Premium',
        category='predator'
    )

    ikan2 = Fish(
        name='Louhan',
        price='85000',
        image='img/louhan.jpg',
        desc='Ikan hias dengan jenong besar dan warna cantik.',
        size='25 cm',
        temp='28-30°C',
        ph='6.5-7.5',
        badge='Best Seller',
        category='hias'
    )

    ikan3 = Fish(
    name='Oscar Tiger',
    price='95000',
    image='img/oscar.jpg',
    desc='Ikan oscar dengan warna tiger.',
    size='20 cm',
    temp='26-30°C',
    ph='6.5-7.5',
    badge='New',
    category='predator'
)

    

    db.session.add(ikan1)
    db.session.add(ikan2)
    db.session.add(ikan3)
    

    db.session.commit()

    return 'Data ikan berhasil ditambahkan!'

# API DATA IKAN
@app.route('/api/fish')
def get_fish():

    fishes = Fish.query.all()

    result = []

    for fish in fishes:

        result.append({
            'id': fish.id,
            'name': fish.name,
            'price': fish.price,
            'image': fish.image,
            'desc': fish.desc,
            'size': fish.size,
            'temp': fish.temp,
            'ph': fish.ph,
            'badge': fish.badge,
            'filter': fish.category
        })
@app.route('/api/add_fish', methods=['POST'])
def add_fish():

    data = request.json

    new_fish = Fish(
        name=data['name'],
        price=data['price'],
        image=data['image'],
        desc=data['desc'],
        size=data['size'],
        temp=data['temp'],
        ph=data['ph'],
        badge=data['badge'],
        category=data['category']
    )

    db.session.add(new_fish)
    db.session.commit()

    return jsonify({
        'message': 'Ikan berhasil ditambahkan!'
    })


if __name__ == '__main__':

    with app.app_context():
        db.create_all()

    app.run(debug=True)