import React, { useEffect, useState } from 'react';
import ExpenseChart from './components/ExpenseChart';
import './styles.css';

function App() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch('/expenses')
            .then(res => res.json())
            .then(data => setExpenses(data))
            .catch(err => console.error('Error fetching expenses:', err));
    }, []);

    return (
        <div className="App">
            <h1>SME Expense Management Dashboard</h1>
            <ExpenseChart expenses={expenses} />
        </div>
    );
}

export default App;
