import AdminRole from './adminrole.js'
import Contributor from './contributor.js'
import Viewer from './viewer.js'
const RoleAccess = {
  ADMIN: AdminRole,
  AGENT: Contributor,
  UNDERWRITER: Viewer
}
export default RoleAccess
