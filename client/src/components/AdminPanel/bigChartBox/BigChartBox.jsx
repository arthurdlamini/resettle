import React from 'react';

import './style.css';
import {
	
	Bar,
	BarChart,
	
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../Pages/LoadingSpinner';

function BigChartBox({data,title}) {

	const isLoading = useSelector((state) => state.user.isLoading);
	
	
	return (
		<div className='bigChartBox'>
			<span className='chartBoxTitle'>{title}</span>
			<div className='bigchart'>
			{isLoading ? (
					// Render the loading spinner while loading is true
					<LoadingSpinner/>
				) : (
					// Render the fetched data
					<>
					<ResponsiveContainer width='100%' height='100%'>
					<BarChart data={data}>
						<Tooltip
							contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
							labelStyle={{ display: 'none' }}
							cursor={{ fill: 'none' }}
						/>
						
						<XAxis dataKey='location'  />
						<YAxis />
						<Legend />
						<Bar dataKey='total' fill='#4169e1'/>
					</BarChart>
				</ResponsiveContainer>
					</>
				)}
				
			</div>
		</div>
	);
}

export default BigChartBox;
