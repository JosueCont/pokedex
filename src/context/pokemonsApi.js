import createDataContext from './createDataContext';
import apiCall from '../api/apiCall';
import axios from 'axios';

const pokemonsReducer= (state,action) => {
  switch(action.type){
    case 'fetch_data':
      return {...state,data:action.payload,loading:false};
    case 'failed_fetch':
      return{...state,error:action.payload};
    case 'detail_fetch':
      return {...state,detail:action.payload, loading:true};
      case 'fetch_evolution':
        return {...state,evolution:action.payload};
    default:
    return state;
  }
};

const fecthData= dispatch => async() =>{
  try{
    const response = await apiCall.get('api/v2/pokemon?limit=631');
    dispatch({type:'fetch_data', payload:response.data});
    console.log('datoos',response.data);
  }catch(e){
    dispatch({type:'failed_fetch',payload:'error al llamar a la api'});
  }
};


const Details = dispatch => async(name) =>{
  try{
    const response = await apiCall.get(`api/v2/pokemon/${name}`);
    dispatch({type:'detail_fetch',payload:response.data});
  }catch(e){
    dispatch({type:'failed_fetch',payload:'error al llamar a la api'});
  }
};

const fetchEvolution = dispatch => async(id) => {
  try{
    const response = await apiCall.get(`api/v2/pokemon-species/${id}`);
    const evolution = await axios.get(`${response.data.evolution_chain.url}`)
    dispatch({type:'fetch_evolution',payload:evolution.data});
  }catch(e){
    dispatch({type:'failed_fetch',payload:'error al llamar a la api'});
  }
};

export const {Provider,Context} = createDataContext(
  pokemonsReducer,
  {fecthData,Details,fetchEvolution},
  {error:'',data:[],detail:[],evolution:[],loading:false}
);