import {
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
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
            blocks: action.node.blocks || [],
            fetchBlocksFailure: false,
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
            blocks: action.node.blocks || [],
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case GET_NODE_BLOCKS_SUCCESS:
      return {
        ...state,
        list: state.list.map(node => {
          // if it's not the node we're looking for, do nothing
          if (node.id !== action.node.id) {
            return node
          }
          // else we found the right node, add the blocks
          return {
            ...node,
            blocks: action.res.blocks
          }
        })
      }
    case GET_NODE_BLOCKS_FAILURE:
      return {
        ...state,
        list: state.list.map(node => {
          // if it's not the node we're looking for, do nothing
          if (node.id !== action.node.id) {
            return node
          }
          // else we found the right node, add the blocks
          return {
            ...node,
            fetchBlocksFailure: true,
          }
        })
      }
    default:
      return state;
  }
}
