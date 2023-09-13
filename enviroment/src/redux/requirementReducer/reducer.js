
const InitialState = {
    RequirementTypes: [{name:'全部类型', value: -1},{name:"可协商", value: 1}, {name:"不可协商", value: 2}],
    requirementTypesDefaultValue: -1,  /* 默认值 */
}


export default function reducer(state, action){
    const {data, type} = action;
    switch (type) {
        default:
            return InitialState;
    }
}
