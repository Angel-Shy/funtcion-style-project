import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NarBarItem extends Component {

    render() {
        return (
            <li>
                <div onClick={this.swap}>
                    <img src={this.props.image} alt=""/>
                    <span>{this.props.itemName}</span>
                </div>
                <ul ref={element => this.children = element} className="hidden">
                    {this.props.subNavs.map((nar,i)=>{
                        return <li key={i}>
                            <Link to={nar.link}>{i + 1}.{nar.name}</Link>
                        </li>
                    }) }
                </ul>
            </li>
        );
    }

    swap = (e)=>{
        this.children.classList.toggle('hidden');
    }
}

export default NarBarItem;