/**
 * Unit tests for src/check-statuses.js
 */
const { checkStatuses } = require('../src/check-statuses');
const { expect } = require('@jest/globals');
const _ = require('lodash');

require('dotenv').config();

function generateSourceData(statusList) {
  return {
    statuses: statusList.map(status => {
      return {
        status,
        context: `test_${status}_workflow / test_${status}_job (test_${status}_trigger)`
      };
    })
  };
}

function generateResultData(statusList = ['success']) {
  return statusList.map(status => {
    return {
      jobName: `test_${status}_job`,
      status,
      context: `test_${status}_workflow / test_${status}_job (test_${status}_trigger)`,
      workflowName: `test_${status}_workflow`,
      triggerEvent: `test_${status}_trigger`
    };
  });
}

function iterateCompare(value, array) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (_.isEqual(value, element)) {
      return true;
    }
  }

  return false;
}

function doArraysCompare(array1, array2) {
  if (array1.length !== array2.length) {
    return `${array1.length} !== ${array2.length}`;
  }

  const array1Copy = array1.filter(item => !iterateCompare(item, array2));

  if (array1Copy.length) {
    return array1Copy;
  }

  const array2Copy = array2.filter(item => !iterateCompare(item, array1));

  if (array2Copy.length) {
    return array2Copy;
  }

  return undefined;
}

describe('check-statuses.js', () => {
  it('return allowed, denied and pending filtered by workflowName', async () => {
    const allowedStatuses = ['success', 'skipped'];
    const workflowNames = [
      'test_success_workflow',
      'test_skipped_workflow',
      'test_failure_workflow',
      'test_pending_workflow'
    ];
    const jobNames = undefined;
    const triggerEvents = undefined;
    const sourceData = generateSourceData([
      'success',
      'skipped',
      'failure',
      'pending'
    ]);
    const expectedAllowedResulData = generateResultData(['success', 'skipped']);
    const expectedDeniedResulData = generateResultData(['failure']);
    const expectedPendingResulData = generateResultData(['pending']);

    const result = checkStatuses(
      sourceData,
      allowedStatuses,
      workflowNames,
      jobNames,
      triggerEvents
    );

    expect(
      doArraysCompare(result.allowed, expectedAllowedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.denied, expectedDeniedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.pending, expectedPendingResulData)
    ).toBeUndefined();
  });

  it('return allowed, denied and pending filtered by jobNames', async () => {
    const allowedStatuses = ['success', 'skipped'];
    const workflowNames = undefined;
    const jobNames = [
      'test_success_job',
      'test_skipped_job',
      'test_failure_job',
      'test_pending_job'
    ];
    const triggerEvents = undefined;
    const sourceData = generateSourceData([
      'success',
      'skipped',
      'failure',
      'pending'
    ]);
    const expectedAllowedResulData = generateResultData(['success', 'skipped']);
    const expectedDeniedResulData = generateResultData(['failure']);
    const expectedPendingResulData = generateResultData(['pending']);

    const result = checkStatuses(
      sourceData,
      allowedStatuses,
      workflowNames,
      jobNames,
      triggerEvents
    );

    expect(
      doArraysCompare(result.allowed, expectedAllowedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.denied, expectedDeniedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.pending, expectedPendingResulData)
    ).toBeUndefined();
  });

  it('return allowed, denied and pending filtered by triggerEvents', async () => {
    const allowedStatuses = ['success', 'skipped'];
    const workflowNames = undefined;
    const jobNames = undefined;
    const triggerEvents = [
      'test_success_trigger',
      'test_skipped_trigger',
      'test_failure_trigger',
      'test_pending_trigger'
    ];
    const sourceData = generateSourceData([
      'success',
      'skipped',
      'failure',
      'pending'
    ]);
    const expectedAllowedResulData = generateResultData(['success', 'skipped']);
    const expectedDeniedResulData = generateResultData(['failure']);
    const expectedPendingResulData = generateResultData(['pending']);

    const result = checkStatuses(
      sourceData,
      allowedStatuses,
      workflowNames,
      jobNames,
      triggerEvents
    );

    expect(
      doArraysCompare(result.allowed, expectedAllowedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.denied, expectedDeniedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.pending, expectedPendingResulData)
    ).toBeUndefined();
  });

  it('return allowed, denied and pending filtered by allowedStatuses', async () => {
    const allowedStatuses = ['failure'];
    const workflowNames = undefined;
    const jobNames = undefined;
    const triggerEvents = [
      'test_success_trigger',
      'test_skipped_trigger',
      'test_failure_trigger',
      'test_pending_trigger'
    ];
    const sourceData = generateSourceData([
      'success',
      'skipped',
      'failure',
      'pending'
    ]);
    const expectedAllowedResulData = generateResultData(['failure']);
    const expectedDeniedResulData = generateResultData(['success', 'skipped']);
    const expectedPendingResulData = generateResultData(['pending']);

    const result = checkStatuses(
      sourceData,
      allowedStatuses,
      workflowNames,
      jobNames,
      triggerEvents
    );

    expect(
      doArraysCompare(result.allowed, expectedAllowedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.denied, expectedDeniedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.pending, expectedPendingResulData)
    ).toBeUndefined();
  });

  it('return allowed, denied and pending with no context values', async () => {
    const allowedStatuses = ['success', 'skipped'];
    const workflowNames = undefined;
    const jobNames = undefined;
    const triggerEvents = undefined;
    const sourceData = generateSourceData([
      'success',
      'skipped',
      'failure',
      'pending'
    ]);
    const expectedAllowedResulData = generateResultData(['success', 'skipped']);
    const expectedDeniedResulData = generateResultData(['failure']);
    const expectedPendingResulData = generateResultData(['pending']);

    sourceData.statuses.push({ status: 'failure' });
    expectedDeniedResulData.push({ status: 'failure' });
    sourceData.statuses.push({ status: 'failure', context: '' });
    expectedDeniedResulData.push({ status: 'failure', context: '' });

    const result = checkStatuses(
      sourceData,
      allowedStatuses,
      workflowNames,
      jobNames,
      triggerEvents
    );

    expect(
      doArraysCompare(result.allowed, expectedAllowedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.denied, expectedDeniedResulData)
    ).toBeUndefined();
    expect(
      doArraysCompare(result.pending, expectedPendingResulData)
    ).toBeUndefined();
  });
});
