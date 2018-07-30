const SamplesStatusEnums = {
  SCHEDULED: 'scheduled',
  DISPATCHED: 'dispatched',
  ACTIVE: 'active',
  PENDING: 'pending',
  FAILED: 'failed',
  COMPLETED: 'completed'
}
const SamplesStatusLabels = {
  [SamplesStatusEnums.SCHEDULED]: 'Scheduled',
  [SamplesStatusEnums.DISPATCHED]: 'Dispatched',
  [SamplesStatusEnums.ACTIVE]: 'Active',
  [SamplesStatusEnums.PENDING]: 'Pending',
  [SamplesStatusEnums.FAILED]: 'Failed',
  [SamplesStatusEnums.COMPLETED]: 'Completed'
}

const SamplesStatus = {
  enums: SamplesStatusEnums,
  labels: SamplesStatusLabels
}

export default SamplesStatus

export {
  SamplesStatusEnums,
  SamplesStatusLabels
}