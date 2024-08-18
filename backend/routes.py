from flask import Blueprint, jsonify, request
from models import Expense, db

api = Blueprint('api', __name__)

@api.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([expense.to_dict() for expense in expenses])

@api.route('/expenses', methods=['POST'])
def add_expense():
    data = request.json
    new_expense = Expense(
        category=data['category'],
        amount=data['amount'],
        date=data['date'],
        description=data['description']
    )
    db.session.add(new_expense)
    db.session.commit()
    return jsonify(new_expense.to_dict()), 201
