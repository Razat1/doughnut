// DoughnutChart.js
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js elements
Chart.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ chartData }) {
    // State to store the selected category on segment click
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Callback function to handle segment click events
    const handleSegmentClick = (_, elements) => {
        if (elements.length > 0) {
            const selectedIndex = elements[0].index;
            const selectedCategory = chartData[selectedIndex];

            setSelectedCategory(selectedCategory);
        }
    };

    // Options for the Doughnut chart
    const options = {
        onClick: handleSegmentClick, // Handle segment click event
    };

    // Custom plugin to draw total amount label in the center of the chart
    const doughnutLabel = {
        id: 'doughnutLabel',
        afterDraw: (chart) => {
            const { ctx } = chart;
            // Calculate the total amount from the chart data
            const totalAmount = chartData?.reduce((total, category) => {
                const categoryTotal = category.transactions.reduce(
                    (categoryTotal, transaction) =>
                        categoryTotal + parseFloat(transaction.amount.replace('£', '')),
                    0
                );
                return total + categoryTotal;
            }, 0);

            // Draw the total amount label in the center of the chart
            if (totalAmount) {
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                ctx.font = 'bold 16px sans-serif';
                ctx.fillStyle = '#000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`Total: £${totalAmount.toFixed(2)}`, centerX, centerY);
            }
        },
    };

    const plugins = [doughnutLabel];

    return (
        <div className="chart" data-testid="doughnut-chart">
            <Doughnut
                data={{
                    labels: chartData.map((category) => category.name),
                    datasets: [
                        {
                            label: 'Total Amount Spent',
                            data: chartData.map((category) =>
                                category.transactions.reduce(
                                    (categoryTotal, transaction) =>
                                        categoryTotal + parseFloat(transaction.amount.replace('£', '')),
                                    0
                                )
                            ),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                        },
                    ],
                }}
                options={options}
                plugins={plugins}
            />
            {selectedCategory && (
                <div>
                    <h3>{selectedCategory.name}</h3>
                    <ul>
                        {selectedCategory.transactions.map((transaction, index) => (
                            <li key={index}>
                                {transaction.name} - {transaction.amount} - {transaction.date}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DoughnutChart;
