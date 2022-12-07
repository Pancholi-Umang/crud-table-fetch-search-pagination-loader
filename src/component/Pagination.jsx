import React, { useEffect, useState } from 'react'


// const value = showPerPageRecord * counter;    value = 10 * 2 = [20 hoy]
// "start value:" , value - showPerPageRecord;   st value = 20 - 10 = [10 hoy starting value]
// "end value:" , value                          end value = value = k je 20 chhe



function Pagination({ showPerPageRecord, onPaginationHandler, totalDataLength }) {

    const [counter, setCounter] = useState(1);


    console.log(Math.ceil(totalDataLength / showPerPageRecord));


    useEffect(() => {
        const value = showPerPageRecord * counter;
        onPaginationHandler(value - showPerPageRecord, value);
    }, [counter]);


    const onButtonClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                setCounter(1);
            } else {
                setCounter(counter - 1);
            }
        } else if (type === "next") {
            // i have 10 records so {totalDataLength} is 10
            // showPerPageRecord = 2
            // and used of ceil rounded value and increment
            if (Math.ceil(totalDataLength / showPerPageRecord) === counter) {
                setCounter(counter);
            } else {
                setCounter(counter + 1);
            }
        }
    }
    return (
        <div className='d-flex justify-content-center'>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><button onClick={() => onButtonClick("prev")} className='page-link'>Previous</button></li>
                    {new Array(Math.ceil(totalDataLength / showPerPageRecord)).fill("").map((el, index) => (
                        <li key={index} class={`page-item ${index + 1 === counter ? "active" : null}`}>
                            <a
                                class="page-link"
                                href="!#"
                                onClick={() => setCounter(index + 1)}
                            >
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li className="page-item"><button onClick={() => onButtonClick("next")} className='page-link'>Next</button></li>
                </ul>
            </nav>


        </div>

    )
}

export default Pagination