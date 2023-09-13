import React, {Component, Fragment} from 'react';
import ContractECharts from "./ContractECharts";
import SearchContracts from "./SearchContracts";
import ContractDivisionPage from "./ContractDivisionPage";
import ContractTables from "./ContractTables";

class Contract extends Component {

    render() {
        return (
            <Fragment>
                <ContractECharts/>
                <SearchContracts/>
                <ContractTables/>
                <ContractDivisionPage/>
            </Fragment>
        );
    }
}

export default Contract;