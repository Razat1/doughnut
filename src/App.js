// App.js
import React, { useEffect, useState } from 'react';
import DoughnutChart from './DoughnutChart';

function App() {
    // State to store chart data
    const [chartData, setChartData] = useState(null);

    const filterCategories = (data, filteredCategories) => {
        const filteredData = data.categories
            .filter(category => filteredCategories.includes(category.name))
            .map(category => ({
                name: category.name,
                transactions: category.transactions
            }));

        // Calculate the total for "Others" category
        const othersCategories = data.categories
            .filter(category => !filteredCategories.includes(category.name));

        const othersTransactions = othersCategories.flatMap(category => category.transactions);
        const othersTotal = othersTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount.replace('£', '')), 0);

        // Add "Others" category if there are transactions
        if (othersTotal > 0) {
            filteredData.push({
             name: "Others",
                transactions: othersTransactions.map(transaction => ({
                    name: transaction.name,
                    amount: transaction.amount,
                    date: transaction.date
                })),
                totalAmount: `£${othersTotal}`
            });
        }

        return filteredData;
    };


    // Effect to fetch data from the JSON file when the component mounts
    useEffect(() => {
        // Fetch data from the JSON file
        fetch('/expenses.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched data:', data);
                // setChartData(data.categories);
                const allowedCategories = ["Food", "Grocery", "Shopping"];
                const processedData = filterCategories(data, allowedCategories);
                setChartData(processedData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <h1 style={{ padding: '20px' }}>Expenditure</h1>
            <div style={{ width: '50%', height: '50%' }}>
                <div>
                    {chartData ? (
                        // Render the DoughnutChart component with the fetched data
                        <DoughnutChart chartData={chartData} />
                    ) : (
                        // Render a loading message while the data is being fetched
                        <p>Loading chart data...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
