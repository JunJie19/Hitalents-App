import React, { Component } from 'react';

import '../styles/inputrange.css';

export default class InputRange extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);
        this.min = this.props.minValue || 0
        this.max = this.props.maxValue || 5000000

        this.state = {
            range: {
                left: '0%',
                right: '0%'
            },
            thumb: {
                left: '0%',
                right: '100%'
            },
            sign: {
                left: '0%',
                right: '100%'
            },
            value: {min: this.min, max: this.max}
        }
        
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleLowerBoundRangeChange = this.handleLowerBoundRangeChange.bind(this);
        this.handlelUpperBoundRangeChange = this.handlelUpperBoundRangeChange.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                value: nextProps.value
            })
        }
    }

    handleLowerBoundRangeChange(e) {
        console.log('this.max', this.max);
        let { range, thumb, sign, value } = this.state;
        const { onChange } = this.props;

        const min = Math.min(e.target.value, value.max-1)
        Object.assign(value, {
            min
        })

        const left = `${(min / parseInt(this.max)) * 100}%`
        Object.assign(range, {
            left
        })
        Object.assign(thumb, {
            left
        })
        Object.assign(sign, {
            left
        })

        this.setState({
            range, thumb, sign, value
        }, () => {
            onChange(value)
        })

    }

    handlelUpperBoundRangeChange(e) {
        console.log('this.max', this.max);
        let { range, thumb, sign, value } = this.state;
        const { onChange } = this.props;

        const max = Math.max(e.target.value, value.min+1)
        Object.assign(value, {
            max
        })

        const left = `${(max / parseInt(this.max)) * 100}%`
        const right = `${(1 - max / parseInt(this.max)) * 100}%`
        Object.assign(range, {
            right
        })
        Object.assign(thumb, {
            right: left
        })
        Object.assign(sign, {
            right: left
        })

        this.setState({
            range, thumb, sign, value
        }, () => {
            onChange(value)
        })
    }

    handleChangeComplete(){
        const { onChangeComplete } = this.props;
        
        if(onChangeComplete){
            const { value } = this.state;
            onChangeComplete(value);
        }   
    }

    render() {
        const { range, thumb, sign, value } = this.state;
        const { step } = this.props;

        return (
            <div className="slider" id="slider-distance">
                <div>
                    <div className="inverse-left" style={{ width: '70%' }}>
                        <span>{this.min}</span>
                    </div>
                    <div className="inverse-right" style={{ width: '70%' }}>
                        <span>{this.max}</span>
                    </div>
                    <div className="range" style={{ left: range.left, right: range.right }}></div>
                    <span className="thumb" style={{ left: thumb.left }}></span>
                    <span className="thumb" style={{ left: thumb.right }}></span>
                    <div className="sign" style={{ left: sign.left }}>
                        <span id="value">{value.min}</span>
                    </div>
                    <div className="sign" style={{ left: sign.right }}>
                        <span id="value">{value.max}</span>
                    </div>
                </div>
                <input type="range" value={value.min} max={this.max} min={this.min} step={step || 1} 
                        onChange={this.handleLowerBoundRangeChange} 
                        onTouchEnd={this.handleChangeComplete}
                        onMouseUp={this.handleChangeComplete}/>

                <input type="range" value={value.max} max={this.max} min={this.min} step={step || 1} 
                        onChange={this.handlelUpperBoundRangeChange} 
                        onTouchEnd={this.handleChangeComplete}
                        onMouseUp={this.handleChangeComplete}/>
            </div>
        )
    }
}