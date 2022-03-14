import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA = {
    id: 'anchorman',
    online: false,
    title: null,
    blocks: [],
  };

  const nodeB = {
    id: 'moby-dick',
    online: false,
    title: null,
    blocks: [],
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodeA, res: {title: 'alpha'} };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_NODE_BLOCKS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_NODE_BLOCKS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocksLoading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_NODE_BLOCKS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const testBlock = {
      id: 1,
      attributes: {
        data: 'test'
      }
    }
    const action = { type: ActionTypes.GET_NODE_BLOCKS_SUCCESS, node: nodeA, res: {blocks: [testBlock]} };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: [testBlock],
          blocksLoading: false,
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_NODE_BLOCKS_FAILURE', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_NODE_BLOCKS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocksLoading: false,
          fetchBlocksFailed: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

});
