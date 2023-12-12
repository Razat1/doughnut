import React from 'react';
import { render, screen } from '@testing-library/react';
import DoughnutChart from '../../src/DoughnutChart';
import expect from 'expect';

// Import the polyfill
import 'resize-observer-polyfill';

test('renders DoughnutChart with provided data', () => {
    const data = {
        categories: [
            { name: 'Category A', transactions: [{ name: 'Transaction A', amount: '£10.00', date: '2023-01-01' }] },
            { name: 'Category B', transactions: [{ name: 'Transaction B', amount: '£20.00', date: '2023-01-02' }] },
        ],
    };

    render(<DoughnutChart chartData={data.categories} />);

    // Add assertions based on your expected UI
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
    // You can add more assertions based on the expected UI state or elements
    // For example: expect(screen.getByText('Category A')).toBeInTheDocument();
});
