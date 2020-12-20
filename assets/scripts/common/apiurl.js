const API = {
  authenticate: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/authenticate',
  registration: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/registration',
  roledetails: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/roledetails',
  userdetails: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/userdetails',
  saveuserdetails: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/saveuserdetails',
  userlogout: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/userlogout',
  masterJsonData: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/masterJsonData'
}
const DefineLOB = {
  viewDefineLob: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/viewDefineLob',
  addDefineLobRecord: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/addDefineLobRecord',
  deleteDefineLobRecord: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/deleteDefineLobRecord',
  editDefineLobRecord: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/editDefineLobRecord'
}
const SourceDef = {
  viewSourceDefinition: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/viewSourceDefinition',
  addSourceDefinitionData: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/addSourceDefinitionData',
  deleteSourceDefinitionData: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/deleteSourceDefinitionData',
  editSourceDefinitionData: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/editSourceDefinitionData'
}
const Addfeatures = {
  viewFeaturesData: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/viewFeaturesData',
  addFeaturesData: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/addFeaturesData',
  editFeaturesData: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/editFeaturesData',
  deleteFeaturesData: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/deleteFeaturesData'
}
const Coverages = {
  viewCoverage: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/viewCoverage',
  addCoverage: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/addCoverage',
  deleteCoverage: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/deleteCoverage',
  editCoverage: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/editCoverage'
}
const Opportunities = {
  opportunityDetails: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/opportunityDetails',
  addOpportunity: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/addOpportunity',
  deleteOpportunity: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/deleteOpportunity',
  editOpportunity: 'http://duckcreek-978884407.ap-south-1.elb.amazonaws.com/requirementsportal/editOpportunity'
}
export { DefineLOB, SourceDef, Addfeatures, Coverages, Opportunities }
export default API
