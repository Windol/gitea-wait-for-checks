/**
 * Wait for a number of milliseconds.
 *
 * @param {number} milliseconds The number of milliseconds to wait.
 * @returns {Object} Resolves with 'done!' after the wait is over.
 */
function checkStatuses(
  data,
  allowedStatuses,
  workflowNames,
  jobNames,
  triggerEvents
) {
  // console.log("statuses:", statuses);
  let jobs = data.statuses.map(status => {
    // console.log("status:", status);
    const contextRegex = new RegExp('(.+) \\/ (.+) \\((.+)\\)', 'gs');
    const contextMatches = contextRegex.exec(status.context);

    if (contextMatches && contextMatches.length === 4) {
      status.workflowName = contextMatches[1];
      status.jobName = contextMatches[2];
      status.triggerEvent = contextMatches[3];
    }

    // const targetUrlRegex = new RegExp(
    //   '\\/runs\\/(\\d+)\\/jobs\\/(\\d+)$',
    //   'gs'
    // );
    // const targetUrlMatches = targetUrlRegex.exec(status.target_url);

    // if (targetUrlMatches && targetUrlMatches.length === 3) {
    //   status.runNumber = targetUrlMatches[1];
    //   status.jobNumber = targetUrlMatches[2];
    // }

    return status;
  });

  if (workflowNames) {
    jobs = jobs.filter(job => workflowNames.includes(job.workflowName));
  }

  if (jobNames) {
    jobs = jobs.filter(job => jobNames.includes(job.jobName));
  }

  if (triggerEvents) {
    jobs = jobs.filter(job => triggerEvents.includes(job.triggerEvent));
  }

  const pending = jobs.filter(job => job.status === 'pending');
  const allowed = jobs.filter(job => allowedStatuses.includes(job.status));
  const denied = jobs.filter(
    job => job.status !== 'pending' && !allowedStatuses.includes(job.status)
  );

  return { pending, allowed, denied };
}

module.exports = { checkStatuses };
