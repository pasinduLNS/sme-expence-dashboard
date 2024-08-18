from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    description = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'amount': self.amount,
            'date': self.date.isoformat(),
            'description': self.description
        }
