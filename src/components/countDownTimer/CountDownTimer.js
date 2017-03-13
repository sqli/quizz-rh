import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import './countDownTimer.css'

class CountDownTimer extends Component {
    constructor(props) {
        super(props);
        this.endDate = new Date(Date.parse(new Date()) + this.props.initialTimeRemaining*1000);
        this.state = {
            initialRemaining: this.props.initialTimeRemaining*1000,
            timeRemaining: this.props.initialTimeRemaining,
            completeCallback: this.props.onComplete
        }
    }

    componentDidMount() {
        this.tick();
        this.interval = setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
        clearTimeout(clearInterval(this.interval));
    }

    tick() {
        let startDate = new Date();
        let remaining = this.endDate - startDate;

        if(remaining <= 0){
            window.clearInterval(this.interval);
            this.state.completeCallback();
        } else {
            this.setState({
                timeRemaining: remaining
            })
        }


    }

    getFormattedTime(milliseconds) {
        var totalSeconds = Math.round(milliseconds / 1000);

        var seconds = parseInt(totalSeconds % 60, 10);
        var minutes = parseInt(totalSeconds / 60, 10) % 60;
        var hours = parseInt(totalSeconds / 3600, 10);

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;

        return hours + ':' + minutes + ':' + seconds;
    }

    render() {
        var timeRemaining = this.state.timeRemaining;
        return (
            <div className="countDownTimer">
                <div className="countDownTimer-progress">
                    <CircularProgress
                        mode="determinate"
                        value={this.state.timeRemaining * 100 / this.state.initialRemaining}
                        size={100}
                        thickness={6}
                        />
                </div>
                <span className="countDownTimer-time">{this.getFormattedTime(timeRemaining)}</span>
            </div>
        );
    }

}
export default CountDownTimer;