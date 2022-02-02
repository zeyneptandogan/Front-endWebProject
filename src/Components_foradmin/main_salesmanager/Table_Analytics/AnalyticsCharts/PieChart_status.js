import React from 'react'
import { Pie} from 'react-chartjs-2'
function PieChart_status(props){
    return (
        <div>
            <Pie
                data={{
                    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    labels: ['Processing', 'In Transit', 'Delivered', 'Refund Requested', 'Refund Rejected','Refunded'],
                    datasets: [
                        {
                            label: '# of comments according to status',
                            data: [props.status.processing, props.status.inTransit, props.status.delivered, props.status.refundRequested, props.status.refundRejected,props.status.refunded],

                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(100, 140, 70, 1)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(54, 140, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                        // {
                        //   label: 'Quantity',
                        //   data: [47, 52, 67, 58, 9, 50],
                        //   backgroundColor: 'orange',
                        //   borderColor: 'red',
                        // },
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


export default PieChart_status;