// __tests__/DonutChart.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import DonutChart from '../../src/DoughnutChart';
import expect from "expect";

test('renders DoughnutChart with provided data', () => {
    const data = {
        categories: ['Category A', 'Category B', 'Category C'],
        values: [30, 40, 30],
    };

    render(<DonutChart data={data} />);

    expect(screen.getByText(/Total: £100.00/)).toBeInTheDocument(); // Adjust this based on your expected text
    expect(screen.getByText(JSON.stringify(data))).toBeInTheDocument();
});
