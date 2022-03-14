import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    id: "anchorman",
    online: false,
    title: null,
  };

  const block = {
    id: '1',
    attributes: {
      data: 'test'
    },
  }

  it("should fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ title: "Anchorman" });
        },
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node,
        res: { title: "Anchorman" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fetch the node blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ blocks: [block] });
        },
      })
    );
    await ActionCreators.getNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_NODE_BLOCKS_START,
        node,
      },
      {
        type: ActionTypes.GET_NODE_BLOCKS_SUCCESS,
        node,
        res: { blocks: [block] },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.getNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_NODE_BLOCKS_START,
        node,
      },
      {
        type: ActionTypes.GET_NODE_BLOCKS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
