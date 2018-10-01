
const state={
    size:0,
    getdata:[]
}

const getters={
    peoplelist1:state=>{
        return state;
    }
}

const actions={
    
}

const mutations={
   aedd(state,{count}){
        state.size+=count
    },
    get(state,{data}){
        state.getdata=data;
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}