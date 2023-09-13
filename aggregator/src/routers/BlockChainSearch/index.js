import React, {Fragment} from 'react';
import BlockChainSearchHeader from "./BlockChainSearchHeader";
import SearchBlock from "./SearchBlock";
import BlockChainTable from "./BlockChainTable";
import BlockDivisionPage from "./BlockDivisionPage";
import BlockChainTimeScale from '../BlockChain/BlockChainTimeScale'

function BlockChainSearch(props) {
    return (
        <Fragment>
            <BlockChainSearchHeader/>
            {/*<BlockChainTimeScale/>*/}
            <SearchBlock/>
            <BlockChainTable/>
            <BlockDivisionPage/>
        </Fragment>
    );
}

export default BlockChainSearch;