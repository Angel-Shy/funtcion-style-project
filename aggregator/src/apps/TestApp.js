import React, {Component} from 'react';
import '../sass/index.scss';
import Select from "../components/form/select";

class TestApp extends Component {

    state = {
        options: [
            {value: '1', name: '选项一'},
            {value: '2', name: '选项二'},
            {value: '3', name: '选项三'},
            {value: '4', name: '选项四'},
        ],
    }

    getSelectOption = (select) => {
        console.log(select);
    }

    render() {
        return (
            <div style={{padding: 10}}>
                <Select sendData={this.getSelectOption}  options={this.state.options} />
            </div>
        );
    }
}

export default TestApp;