import React from 'react'
import { Line} from 'react-chartjs-2'
export default function Charts(props) {
    console.log(props.order);

    if (props.order.length !== 0) {
        return (
            <div>
                <Line
                    data={{
                        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

                        labels: [props.order[0].date, props.order[1].date, props.order[2].date, props.order[3].date, props.order[4].date,
                            props.order[5].date, props.order[6].date, props.order[7].date, props.order[8].date, props.order[9].date],
                        datasets: [
                            {
                                label: '# of orders by date',
                                data: [parseInt(props.order[0].price), parseInt(props.order[1].price), parseInt(props.order[2].price),
                                    parseInt(props.order[3].price), parseInt(props.order[4].price), parseInt(props.order[5].price),
                                    parseInt(props.order[6].price), parseInt(props.order[7].price), parseInt(props.order[8].price), parseInt(props.order[9].price)],
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
        )
    }
    else
    {
        return null;
    }

}
