import React, { useState } from 'react'


function Sort(props) {

    const [selectSort, setSelectSort] = useState("")

    const onChangeSort = (event) => {
        setSelectSort(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <select
                defaultValue="Sort" onChange={onChangeSort}
            >
                <option disabled value="Sort">Sort</option>
                <option  value="Lowest">Lowest</option>
                <option  value="Highest">Highest</option>
                <option  value="Most Popular">Most Popular</option>
                <option  value="Least Popular">Least Popular</option>
                <option  value="A-Z">A-Z</option>
                <option  value="Z-A">Z-A</option>

            </select>
        </div>
    )
}

export default Sort