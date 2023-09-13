import React, {Component} from 'react';
import PubSub from 'pubsub-js'

class VCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.initState()
        }
    }

    componentDidMount() {
        console.log(this.props);
        PubSub.publish('GET_VALIDATE_CODE', this.state.data );
    }

    initState(){
        return {
            data: this.getRandom(109,48,4),
            rotate: this.getRandom(75,-75,4),
            fz: this.getRandom(25,18,4),
            color: [this.getRandom(100,255,3),this.getRandom(100,255,4),this.getRandom(100,255,3),this.getRandom(100,255,3)]
        }
    }

    getRandom(max, min, num) {
        const asciiNum = ~~(Math.random()*(max-min+1)+min)
        if(!Boolean(num)){
            return asciiNum
        }
        const arr = []
        for(let i = 0; i < num; i++){
            arr.push(this.getRandom(max, min))
        }
        return arr
    }

    render() {
        return (
            <div className='vcodeWrap'
                 onMouseLeave={() => {this.setState({refresh: false})}}
                 onMouseEnter={() => {this.setState({refresh: true})}}
            >
                {this.state.data.map((v,i) =>
                    <div
                        key={i}
                        className='itemStr'
                        style={{
                            transform:`rotate(${this.state.rotate[i]}deg)`,
                            fontSize: `${this.state.fz[i]}px`,
                            color: `rgb(${this.state.color[i].toString()})`
                        }}
                    >
                        {String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ))}
                    </div>
                )}
                {
                    this.state.refresh
                        ? <div
                            className='mask'
                            onClick={this.clickRefresh}
                            onMouseLeave={() => {this.setState({refresh: false})}}
                        > 点击刷新
                        </div>
                    : null}
            </div>
        )
    }

    clickRefresh = (e) => {
        let validate = this.initState();
        this.setState({...validate,refresh: false});
        PubSub.publish('GET_VALIDATE_CODE', validate.data );
    }

}

export default VCode;