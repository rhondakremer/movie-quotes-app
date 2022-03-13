import * as ActionTypes from '../constants/actionTypes';

import configureStore from './configureStore';

describe('Store', () => {
  const nodes = {
    list: [
      { id: 'a.com', online: false, title: null, loading: false },
      { id: 'b.com', online: false, title: null, loading: false },
      { id: 'c.com', online: false, title: null, loading: false },
      { id: 'd.com', online: false, title: null, loading: false }
    ]
  };

  beforeAll(() => {});
  afterAll(() => {});

  it('should display results when necessary data is provided', () => {
    const store = configureStore({nodes});

    const actions = [
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {title: 'alpha'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: {title: 'beta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {title: 'gamma'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[2], res: {title: 'delta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: {title: 'epsilon'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {title: 'zeta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {title: 'eta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {title: 'theta'} },
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        { id: 'a.com', online: true, title: 'theta', loading: false },
        { id: 'b.com', online: true, title: 'epsilon', loading: false },
        { id: 'c.com', online: true, title: 'delta', loading: false },
        { id: 'd.com', online: false, title: null, loading: false }
      ]
    };

    expect(actual.nodes).toEqual(expected);
  });
});
