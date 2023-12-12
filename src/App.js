// App.js
import React, { useEffect, useState } from 'react';
import DoughnutChart from './DoughnutChart';

function App() {
    // State to store chart data
    const [chartData, setChartData] = useState(null);

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
                setChartData(data.categories);
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
