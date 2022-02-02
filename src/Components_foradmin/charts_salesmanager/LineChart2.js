import React from 'react'
import { Line} from 'react-chartjs-2'
function LineChart2(props){
    if(props.profit.length !== 0){
    return (
        <div>
            <Line
                data={{
                     //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    labels: [props.profit[0].date, props.profit[1].date, props.profit[2].date, props.profit[3].date, props.profit[4].date,
                        props.profit[5].date, props.profit[6].date, props.profit[7].date, props.profit[8].date, props.profit[9].date],
                    datasets: [
                        {
                            label: '# of orders by date',
                            data: [parseInt(props.profit[0].price), parseInt(props.profit[1].price), parseInt(props.profit[2].price),
                                parseInt(props.profit[3].price), parseInt(props.profit[4].price), parseInt(props.profit[5].price),
                                parseInt(props.profit[6].price), parseInt(props.profit[7].price), parseInt(props.profit[8].price), parseInt(props.profit[9].price)],
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


export default LineChart2;