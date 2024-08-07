import React from 'react';
import './style.css';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../Pages/LoadingSpinner';



function PieChartBox({data,title,height}) {

	const isLoading = useSelector((state) => state.user.isLoading);
	return (
		<div className='pieChartBox'>
			<span className='chartBoxTitle'>{title}</span>
			<div className='charrt'>
			{isLoading ? (
					// Render the loading spinner while loading is true
					<LoadingSpinner/>
				) : (
					// Render the fetched data
					<>
					<ResponsiveContainer width='99%' height={height}>
					<PieChart>
                    <Tooltip
                        contentStyle={{background:"white",borderRadius:"5px"}}
                    />
						<Pie
							data={data}
							innerRadius={"70%"}
							outerRadius={"90%"}
							fill='#8884d8'
							paddingAngle={5}
							dataKey='value'>
							{data?.map((item) => (
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
                    data?.map((item)=>(
                        <div className='option' key={item.name}>
                            <div className='dtitle'>
                                <div className='dot' style={{backgroundColor:item.color}}/>
                                <span>{item.name}</span>
                            </div>
                            <span>{item.value}</span>
                        </div>
                    ))
                }
            </div>
		</div>
	);
}

export default PieChartBox;
