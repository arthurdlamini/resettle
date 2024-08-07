import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup'


function ChartBox(props) {
	
	return (
		<div className='chartBox'>
			<div className='boxInfo'>
				<div className='title'>
					{props.icon}
					<span className='chartBoxTitle'>{props.title}</span>
				</div>
				<h1 className='chartBoxContent'><CountUp duration={5} end={props.count} /></h1>
				{props.hide &&<Link to={props.link} className='chartBoxLink'>View all</Link> }
			</div>
			{/* <div className='chartInfo'>
				<div className='chart'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart data={props.data}>
							<Tooltip
								contentStyle={{ background: 'transparent', border: 'none' }}
								labelStyle={{ display: 'none' }}
								position={{ x: -10, y: 50 }}
							/>
							<Line
								type='monotone'
								dataKey='value'
								stroke='#8884d8'
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
				<div className='texts'>
					<span className='percentage'>45%</span>
					<span className='duration'>this month</span>
				</div>
			</div> */}
		</div>
	);
}

export default ChartBox;
