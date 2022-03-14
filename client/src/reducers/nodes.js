import {
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
  GET_NODE_BLOCKS_START,
  GET_NODE_BLOCKS_SUCCESS,
  GET_NODE_BLOCKS_FAILURE,
} from '../constants/actionTypes';
import initialState from './initialState';

export default function nodesReducer(state = initialState().nodes, action) {
  let list, nodeIndex;
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.id === action.node.id);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.id === action.node.id);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            title: action.res.title,
            loading: false,
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.id === action.node.id);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false,
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case GET_NODE_BLOCKS_START:
      return {
        ...state,
        list: state.list.map(node => {
          // if the ids don't match, do not update the node
          if (node.id !== action.node.id) {
            return node
          }
          return {
            ...node,
            blocksLoading: true,
          }
        })
      }
    case GET_NODE_BLOCKS_SUCCESS:
      return {
        ...state,
        list: state.list.map(node => {
          if (node.id !== action.node.id) {
            return node
          }
          return {
            ...node,
            blocks: action.res.blocks,
            blocksLoading: false,
          }
        })
      }
    case GET_NODE_BLOCKS_FAILURE:
      return {
        ...state,
        list: state.list.map(node => {
          if (node.id !== action.node.id) {
            return node
          }
          return {
            ...node,
            fetchBlocksFailed: true,
            blocksLoading: false,
          }
        })
      }
    default:
      return state;
  }
}
