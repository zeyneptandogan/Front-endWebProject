import React from 'react'
import { Bar} from 'react-chartjs-2'
function BarChart_revenue(props){
    return (
        <div>
            <Bar
                data={{
                    labels: ['Novel', 'Poetry', 'Story', 'Biography', 'Cookbooks'],
                    datasets: [
                        {
                            label: '# of comments',
                            //data: [12, 19, 3, 5, 2, 3],
                            data: [props.revenue.novel_rev, props.revenue.poetry_rev, props.revenue.story_rev, props.revenue.biography_rev, props.revenue.cookbook_rev],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }}
                height={300}
                width={300}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                    legend: {
                        labels: {
                            fontSize: 25,
                        },
                    },
                }}
            />
        </div>
    )
}


export default BarChart_revenue;