import React, {useEffect, useState} from "react";
import ReactStars from "react-rating-stars-component";
import {useParams} from "react-router-dom";
import UserStore from "../../Login-SignUp/UserStore";


export default function Rating() {
    const id = useParams();

    const [data_st,setData_st]=useState({
        star: 0,
        userId: UserStore.userId,
        productId: id.product_id,
    })

    const [initial, setInitial] = useState(null)

    useEffect(()=>{
        getBeforeRating();
    },[])

    const getBeforeRating = () => {
        fetch("http://localhost:8080/rate/getRateOfUser?productId=" + data_st.productId + "&userId=" + UserStore.userId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }})

            .then((response) => response.json())
            .then((json) => {
                console.log("rate: ", json);
                setInitial(json);
            }).catch((error) => {
            console.error(error);
        });
    }
    //console.log(initial)
    const secondExample = {
        name: "star",
        size: 20,
        count: 5,
        color: "black",
        activeColor: "orange",
        value: initial,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: newValue => {
            handle(newValue);
        }
    }



    function handle(e){
        const newdata_st={...data_st}
        newdata_st["star"]=e
        setData_st(newdata_st)
        //console.log(newdata_st)

        fetch("http://localhost:8080/rate/rate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            },
            body: JSON.stringify({star: newdata_st.star, userId: newdata_st.userId, productId: newdata_st.productId})

        })

            .then(res => {
                if (res.error) {
                    //console.log(newdata_st);
                    //this.setState({ loading: false, error: res.error });
                } else {
                    // add time return from api and push comment to parent state
                    //console.log(newdata_st);
                    //console.log("heloo")
                }
            })
            .catch(err => {
                console.log(err);
                //console.log(newdata_st);

            });

    }

    if(initial !== null) {
        return (
            <div className="rating">

                <ReactStars {...secondExample} />

            </div>
        );
    }
    else {
        return null;
    }
}