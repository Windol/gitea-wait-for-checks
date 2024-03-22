/**
 * Unit tests for the action's main functionality, src/main.js
 */
const { expect, beforeEach, describe, it } = require('@jest/globals');
const core = require('@actions/core');
const main = require('../src/main');

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug').mockImplementation();
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation();
const getMultilineInputMock = jest
  .spyOn(core, 'getMultilineInput')
  .mockImplementation();
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation();
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();

// Mock the gitea-get-statuses library
jest.mock('../src/gitea-get-statuses', () => {
  return {
    __esModule: true,
    giteaGetStatuses: jest.fn(async () => {
      return {
        statuses: [
          {
            status: 'success',
            context: 'workflowName1 / jobName1 (triggerEvent1)'
          }
        ]
      };
    })
  };
});

// // Mock the check-statuses library
// let checkStatusesResult = { allowed: [], denied: [], pending: [] };
// jest.mock('../src/check-statuses', () => {
//   return {
//     __esModule: true,
//     checkStatuses: jest.fn(() => { return checkStatusesResult; }),
//   };
// });

// Mock the action's main function
const runMock = jest.spyOn(main, 'run');

// // Other utilities
// const timeRegex = /^\d{2}:\d{2}:\d{2}/;

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fails if no wait-interval input is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          throw new Error('Input required and not supplied: wait-interval');
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: wait-interval'
    );
  });

  it('fails if no api-endpoint input is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'api-endpoint':
          throw new Error('Input required and not supplied: api-endpoint');
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: api-endpoint'
    );
  });

  it('fails if no repo-token input is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'repo-token':
          throw new Error('Input required and not supplied: repo-token');
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: repo-token'
    );
  });

  it('fails if no owner input is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'owner':
          throw new Error('Input required and not supplied: owner');
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: owner'
    );
  });

  it('fails if no repository input is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'repository':
          throw new Error('Input required and not supplied: repository');
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: repository'
    );
  });

  it('fails if no ref input is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'ref':
          throw new Error('Input required and not supplied: ref');
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: ref'
    );
  });

  it('pass even if no allowed-conclusions, workflow-names, job-names and trigger-events inputs are provided', async () => {
    getMultilineInputMock.mockImplementation(() => undefined);
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    // expect(setFailedMock).toHaveBeenNthCalledWith(1, "workflowName1 / jobName1 (triggerEvent1) = success");
    expect(setFailedMock).toHaveBeenCalledTimes(0);
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'status',
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
    // expect(setOutputMock).toHaveBeenNthCalledWith(2, 'raw', {
    //   allowed: [
    //     {
    //       context: 'workflowName1 / jobName1 (triggerEvent1)',
    //       jobName: 'jobName1',
    //       status: 'success',
    //       triggerEvent: 'triggerEvent1',
    //       workflowName: 'workflowName1'
    //     }
    //   ],
    //   denied: [],
    //   pending: []
    // });
  });

  it('pass even if an allowed-conclusions, workflow-names, job-names and trigger-events inputs are provided empty', async () => {
    getMultilineInputMock.mockImplementation(() => []);
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenCalledTimes(0);
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'status',
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
    // expect(setOutputMock).toHaveBeenNthCalledWith(2, 'raw', {
    //   allowed: [
    //     {
    //       context: 'workflowName1 / jobName1 (triggerEvent1)',
    //       jobName: 'jobName1',
    //       status: 'success',
    //       triggerEvent: 'triggerEvent1',
    //       workflowName: 'workflowName1'
    //     }
    //   ],
    //   denied: [],
    //   pending: []
    // });
  });

  it('pass even if an allowed-conclusions, workflow-names, job-names and trigger-events inputs are provided as string empty', async () => {
    getMultilineInputMock.mockImplementation(() => '');
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenCalledTimes(0);
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'status',
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
    // expect(setOutputMock).toHaveBeenNthCalledWith(2, 'raw', {
    //   allowed: [
    //     {
    //       context: 'workflowName1 / jobName1 (triggerEvent1)',
    //       jobName: 'jobName1',
    //       status: 'success',
    //       triggerEvent: 'triggerEvent1',
    //       workflowName: 'workflowName1'
    //     }
    //   ],
    //   denied: [],
    //   pending: []
    // });
  });

  it('pass even if an allowed-conclusions, workflow-names, job-names and trigger-events inputs are provided array with an empty string', async () => {
    getMultilineInputMock.mockImplementation(() => ['']);
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenCalledTimes(0);
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'status',
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
    // expect(setOutputMock).toHaveBeenNthCalledWith(2, 'raw', {
    //   allowed: [
    //     {
    //       context: 'workflowName1 / jobName1 (triggerEvent1)',
    //       jobName: 'jobName1',
    //       status: 'success',
    //       triggerEvent: 'triggerEvent1',
    //       workflowName: 'workflowName1'
    //     }
    //   ],
    //   denied: [],
    //   pending: []
    // });
  });

  it('pass even if allowed-conclusions is provided with an comma separed string', async () => {
    getMultilineInputMock.mockImplementation(name => {
      switch (name) {
        case 'allowed-conclusions':
          return 'success,skipped';
        default:
          return undefined;
      }
    });
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenCalledTimes(0);
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'status',
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
    // expect(setOutputMock).toHaveBeenNthCalledWith(2, 'raw', {
    //   allowed: [
    //     {
    //       context: 'workflowName1 / jobName1 (triggerEvent1)',
    //       jobName: 'jobName1',
    //       status: 'success',
    //       triggerEvent: 'triggerEvent1',
    //       workflowName: 'workflowName1'
    //     }
    //   ],
    //   denied: [],
    //   pending: []
    // });
  });

  it('pass even if allowed-conclusions is provided array with an comma separed string', async () => {
    getMultilineInputMock.mockImplementation(name => {
      switch (name) {
        case 'allowed-conclusions':
          return ['success,skipped'];
        default:
          return undefined;
      }
    });
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenCalledTimes(0);
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'status',
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
    // expect(setOutputMock).toHaveBeenNthCalledWith(2, 'raw', {
    //   allowed: [
    //     {
    //       context: 'workflowName1 / jobName1 (triggerEvent1)',
    //       jobName: 'jobName1',
    //       status: 'success',
    //       triggerEvent: 'triggerEvent1',
    //       workflowName: 'workflowName1'
    //     }
    //   ],
    //   denied: [],
    //   pending: []
    // });
  });

  it('pass even if allowed-conclusions is provided string array', async () => {
    getMultilineInputMock.mockImplementation(name => {
      switch (name) {
        case 'allowed-conclusions':
          return ['success', 'skipped'];
        default:
          return undefined;
      }
    });
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenCalledTimes(0);
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'status',
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
    // expect(setOutputMock).toHaveBeenNthCalledWith(2, 'raw', {
    //   allowed: [
    //     {
    //       context: 'workflowName1 / jobName1 (triggerEvent1)',
    //       jobName: 'jobName1',
    //       status: 'success',
    //       triggerEvent: 'triggerEvent1',
    //       workflowName: 'workflowName1'
    //     }
    //   ],
    //   denied: [],
    //   pending: []
    // });
  });

  it('fail on success condition', async () => {
    getMultilineInputMock.mockImplementation(name => {
      switch (name) {
        case 'allowed-conclusions':
          return ['failure'];
        default:
          return undefined;
      }
    });
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setOutputMock).toHaveBeenCalledTimes(0);
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
  });

  it('pass if wait', async () => {
    getMultilineInputMock.mockImplementation(() => undefined);
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'wait-interval':
          return 1;
        default:
          return '';
      }
    });

    const gitea = require('../src/gitea-get-statuses');

    gitea.giteaGetStatuses
      .mockImplementationOnce(async () => {
        return {
          statuses: [
            {
              status: 'pending',
              context: 'workflowName1 / jobName1 (triggerEvent1)'
            }
          ]
        };
      })
      .mockImplementationOnce(async () => {
        return {
          statuses: [
            {
              status: 'success',
              context: 'workflowName1 / jobName1 (triggerEvent1)'
            }
          ]
        };
      });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenCalledTimes(0);
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'status',
      'workflowName1 / jobName1 (triggerEvent1) = success'
    );
    // expect(setOutputMock).toHaveBeenNthCalledWith(2, 'raw', {
    //   allowed: [
    //     {
    //       context: 'workflowName1 / jobName1 (triggerEvent1)',
    //       jobName: 'jobName1',
    //       status: 'success',
    //       triggerEvent: 'triggerEvent1',
    //       workflowName: 'workflowName1'
    //     }
    //   ],
    //   denied: [],
    //   pending: []
    // });
    expect(debugMock).toHaveBeenCalledWith('waitCondition: true');
  });
});
