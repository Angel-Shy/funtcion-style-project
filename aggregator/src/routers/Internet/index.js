import React, {Component,Fragment} from 'react';
import AddNewBlockChainNode from "./AddNewBlockChainNode";
import InternetECharts from "./InternetEcharts";
import SearchInternetNode from "./SearchInternetNode";
import InternetNodeTable from "./InternetNodeTable";
import InternetDivisionPage from "./InternetDivisionPage";

class Internet extends Component {
    render() {
        return (
            <Fragment>
                <AddNewBlockChainNode/>
                <InternetECharts/>
                <SearchInternetNode/>
                <InternetNodeTable/>
                <InternetDivisionPage/>
            </Fragment>
        );
    }
}

export default Internet;