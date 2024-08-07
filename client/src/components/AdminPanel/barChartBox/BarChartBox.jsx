import React from 'react';
import './style.css';
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	
} from 'recharts';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../Pages/LoadingSpinner';

function BarChartBox(props) {
	
const isLoading = useSelector((state) => state.user.isLoading);

	return (
		<div className='barChartBox'>
			<span className='chartBoxTitle'>{props.title}</span>
			<div className='chartt'>
			{isLoading ? (
					// Render the loading spinner while loading is true
					<LoadingSpinner/>
				) : (
					// Render the fetched data
					<>
					<ResponsiveContainer width='99%' height={150}>
					<PieChart>
                    <Tooltip
                        contentStyle={{background:"white",borderRadius:"5px"}}
                    />
						<Pie
							data={props.data}
							innerRadius={"70%"}
							outerRadius={"90%"}
							fill='#8884d8'
							paddingAngle={5}
							dataKey='count'>
							{props.data?.map((item) => (
								<Cell
									key={item.name}
									fill={item.color}
								/>
							))}
						</Pie>
						
					</PieChart>
				</ResponsiveContainer>
					</>
				)}
     
			</div>
      <div className='options'>
                {
                    props.data?.map((item)=>(
                        <div className='option' key={item.name}>
                            <div className='dtitle'>
                                <div className='dot' style={{backgroundColor:item.color}}/>
                                <span>{item.name}</span>
                            </div>
                            <span>{item.count}</span>
                        </div>
                    ))
                }
            </div>
		</div>
	);
}

export default BarChartBox;
