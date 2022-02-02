import React from 'react';


class SubmitButton2 extends React.Component {
    render(){
        return (


                <button
                    className='btn2'
                    disabled={this.props.disabled}
                    onClick={()=>this.props.onClick()}
                >
                    {this.props.text}
                </button>


        );
    }
}



export default SubmitButton2;