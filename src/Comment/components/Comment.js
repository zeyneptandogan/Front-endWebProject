import React from "react";

export default function Comment(props) {
    const { fullname, comment } = props.comment;

    return (
        <div className="media mb-3">


            <div className="media-body p-2 shadow-sm rounded bg-light border">
                <h6 className="mt-0 mb-1 text-muted">{fullname}</h6>
                {comment}
            </div>
        </div>
    );
}
