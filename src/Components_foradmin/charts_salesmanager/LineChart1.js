import React from 'react'
import { Line} from 'react-chartjs-2'
function LineChart1(props){
    if(props.revenue.length !== 0){
    return (
        <div>
            <Line
                data={{
                     //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    labels: [props.revenue[0].date, props.revenue[1].date, props.revenue[2].date, props.revenue[3].date, props.revenue[4].date,
                        props.revenue[5].date, props.revenue[6].date, props.revenue[7].date, props.revenue[8].date, props.revenue[9].date],
                    datasets: [
                        {
                            label: '# of orders by date',
                            data: [parseInt(props.revenue[0].price), parseInt(props.revenue[1].price), parseInt(props.revenue[2].price),
                                parseInt(props.revenue[3].price), parseInt(props.revenue[4].price), parseInt(props.revenue[5].price),
                                parseInt(props.revenue[6].price), parseInt(props.revenue[7].price), parseInt(props.revenue[8].price), parseInt(props.revenue[9].price)],
                            backgroundColor: [

                                'rgba(255, 206, 86, 0.2)',

                            ],
                            borderColor: [

                                'rgba(54, 162, 235, 1)',


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
    )}
    else {
        return null;
    }
}


export default LineChart1;