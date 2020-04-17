/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// tslint:disable
// graphql typescript definitions

export interface IGraphQLResponseRoot {
  data?: IQuery | IMutation | ISubscription;
  errors?: Array<IGraphQLResponseError>;
}

export interface IGraphQLResponseError {
  message: string; // Required for all errors
  locations?: Array<IGraphQLResponseErrorLocation>;
  [propName: string]: any; // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

export interface IGraphQLResponseErrorLocation {
  line: number;
  column: number;
}

/**
    description?: Query type for all get requests which will not change persistent data
  */
export interface IQuery {
  __typename?: 'Query';
  status?: IStatusQueryType | null;
  listProjects?: Array<IProjectType> | null;
  getProject?: IProjectType | null;
  getUser?: IUserType | null;
  listTeams?: Array<ITeamType> | null;
  getTeam?: ITeamType | null;
  getMyTeams?: Array<ITeamType> | null;
  getEnvironmentLink?: IEnvironmentLinkType | null;
  getAllSessions?: Array<ISessionType> | null;
  listLinodes?: IListLinodesType | null;
  deleteStackScript?: IStackscriptType | null;
  listStackScripts?: IListStackScriptsType | null;
  findStackScripts?: IStackscriptType | null;
  getMachines?: Array<IMachine> | null;
  findMachineByIp?: IMachine | null;
}

export interface IStatusQueryType {
  __typename?: 'StatusQueryType';
  status?: string | null;
}

export interface IProjectType {
  __typename?: 'ProjectType';
  id?: string | null;
  name?: string | null;
  ownedBy?: string | null;
  createdAt?: string | null;
  hasSSL?: boolean | null;
  repoLink?: string | null;
  user_id?: string | null;
  uniqueProjectID?: string | null;
  description?: string | null;
  containerPassword?: string | null;
  environment?: ISpawnType | null;
  sessions?: Array<ISessionType> | null;
  team?: ITeamType | null;
}

export interface ISpawnType {
  __typename?: 'SpawnType';
  vsCodePort?: string | null;
  clientPort?: string | null;
  apiPort?: string | null;
  majesticPort?: string | null;
  containerName?: string | null;
  clientWsPort?: string | null;
  vsCodeLink?: string | null;
  serverAppLink?: string | null;
  clientAppLink?: string | null;
  majesticLink?: string | null;
}

export interface ISessionType {
  __typename?: 'SessionType';
  id?: string | null;
  token?: string | null;
  user_id?: string | null;
  projectId?: string | null;
  project?: IProjectType | null;
  name?: string | null;
  active?: boolean | null;
}

export interface ITeamType {
  __typename?: 'TeamType';
  id?: string | null;
  name?: string | null;
  user_id?: string | null;
  projects?: Array<IProjectType> | null;
}

export interface IUserInputType {
  id?: string | null;
  email?: string | null;
  displayName?: string | null;
  signInMethod?: string | null;
  additionalUserInfo?: IUserTypeAdditionalInfoInput | null;
  user_id?: string | null;
}

export interface IUserTypeAdditionalInfoInput {
  isNewUser?: boolean | null;
  providerId?: string | null;
  profile?: IUserTypeProfileSchema | null;
  username?: boolean | null;
}

export interface IUserTypeProfileSchema {
  avatar_url?: string | null;
  bio?: string | null;
  blog?: string | null;
  company?: string | null;
  created_at?: string | null;
  email?: string | null;
  events_url?: string | null;
  followers?: string | null;
  followers_url?: string | null;
  following?: string | null;
  following_url?: string | null;
  gists_url?: string | null;
  gravatar_id?: string | null;
  hireable?: string | null;
  html_url?: string | null;
  id?: string | null;
  location?: string | null;
  login?: string | null;
  name?: string | null;
  node_id?: string | null;
  organizations_url?: string | null;
  public_gists?: string | null;
  public_repos?: string | null;
  received_events_url?: string | null;
  repos_url?: string | null;
  site_admin?: string | null;
  starred_url?: string | null;
  subscriptions_url?: string | null;
  updated_at?: string | null;
  type?: string | null;
  url?: string | null;
}

export interface IUserType {
  __typename?: 'UserType';
  id?: string | null;
  email?: string | null;
  displayName?: string | null;
  signInMethod?: string | null;
  additionalUserInfo?: IUserTypeAdditionalInfo | null;
  user_id?: string | null;
  cliToken?: string | null;
  type?: string | null;
}

export interface IUserTypeAdditionalInfo {
  __typename?: 'UserTypeAdditionalInfo';
  isNewUser?: boolean | null;
  providerId?: string | null;
  profile?: IUserTypeProfile | null;
  username?: boolean | null;
}

export interface IUserTypeProfile {
  __typename?: 'UserTypeProfile';
  avatar_url?: string | null;
  bio?: string | null;
  blog?: string | null;
  company?: string | null;
  created_at?: string | null;
  email?: string | null;
  events_url?: string | null;
  followers?: string | null;
  followers_url?: string | null;
  following?: string | null;
  following_url?: string | null;
  gists_url?: string | null;
  gravatar_id?: string | null;
  hireable?: string | null;
  html_url?: string | null;
  id?: string | null;
  location?: string | null;
  login?: string | null;
  name?: string | null;
  node_id?: string | null;
  organizations_url?: string | null;
  public_gists?: string | null;
  public_repos?: string | null;
  received_events_url?: string | null;
  repos_url?: string | null;
  site_admin?: string | null;
  starred_url?: string | null;
  subscriptions_url?: string | null;
  updated_at?: string | null;
  type?: string | null;
  url?: string | null;
}

export interface IEnvironmentLinkType {
  __typename?: 'EnvironmentLinkType';
  link?: string | null;
}

export interface IListLinodesType {
  __typename?: 'ListLinodesType';
  data?: Array<ILinodeInstanceType> | null;
  page?: number | null;
  pages?: number | null;
  results?: number | null;
}

export interface ILinodeInstanceType {
  __typename?: 'LinodeInstanceType';
  label?: string | null;
  region?: string | null;
  image?: string | null;
  type?: string | null;
  group?: string | null;
  tags?: Array<string> | null;
  id?: number | null;
  status?: string | null;
  hypervisor?: string | null;
  created?: string | null;
  updated?: string | null;
  ipv4?: Array<string> | null;
  ipv6?: string | null;
  specs?: ILinodeSpecType | null;
  alerts?: ILinodeInstanceAlertType | null;
  backups?: ILinodeInstanceBackupsType | null;
  watchdog_enabled?: boolean | null;
}

export interface ILinodeSpecType {
  __typename?: 'LinodeSpecType';
  disk?: number | null;
  memory?: number | null;
  vcpus?: number | null;
  transfer?: number | null;
}

export interface ILinodeInstanceAlertType {
  __typename?: 'LinodeInstanceAlertType';
  cpu?: number | null;
  network_in?: number | null;
  network_out?: number | null;
  transfer_quota?: number | null;
  io?: number | null;
}

export interface ILinodeInstanceBackupsType {
  __typename?: 'LinodeInstanceBackupsType';
  enabled?: number | null;
  schedule?: ILinodeInstanceBackupsScheduleType | null;
}

export interface ILinodeInstanceBackupsScheduleType {
  __typename?: 'LinodeInstanceBackupsScheduleType';
  day?: string | null;
  window?: string | null;
}

export interface IStackscriptType {
  __typename?: 'StackscriptType';
  id?: number | null;
  username?: string | null;
  user_gravatar_id?: string | null;
  label?: string | null;
  description?: string | null;
  images?: Array<string> | null;
  deployments_total?: number | null;
  deployments_active?: number | null;
  is_public?: boolean | null;
  created?: string | null;
  updated?: string | null;
  rev_note?: string | null;
  script?: string | null;
  user_defined_fields?: string | null;
}

export interface IListStackScriptsType {
  __typename?: 'ListStackScriptsType';
  data?: Array<IStackscriptType> | null;
  page?: number | null;
  pages?: number | null;
  results?: number | null;
}

export type IWorkersEnum = 'vscode' | 'runner';

export interface IMachine {
  __typename?: 'Machine';
  id?: string | null;
  machineHash?: string | null;
  networkInterfaces?: string | null;
  webSocketKey?: string | null;
  worker_type?: IWorkersEnum | null;
}

/**
    description?: Mutation type for all requests which will change persistent data
  */
export interface IMutation {
  __typename?: 'Mutation';
  transferProject?: IProjectType | null;
  createProject?: IProjectType | null;
  assignProject?: Array<IProjectType> | null;
  deleteProject?: IProjectType | null;
  stopProject?: IProjectType | null;
  startProject?: IProjectType | null;
  createUser?: IUserType | null;
  createFirebaseUser?: IUserType | null;
  saveToken?: IUserType | null;
  createTeam?: ITeamType | null;
  deleteTeam?: ITeamType | null;
  generateCodeSession?: ISessionType | null;
  deleteSession?: ISessionType | null;
  revokeSession?: ISessionType | null;
  generateCLIToken?: ICLITokenType | null;
  revokeCLIToken?: ICLITokenType | null;
  publishSignal?: IRemotePubsubType | null;
  createLinode?: ILinodeInstanceType | null;
  deleteLinode?: ILinodeInstanceType | null;
  stopLinode?: ILinodeInstanceType | null;
  startLinode?: ILinodeInstanceType | null;
  createStackScript?: IStackscriptType | null;
  executeRemoteVsCodeCommand?: IGenericReturn | null;
  removeRemoteVsCodeEvent?: IGenericReturn | null;
  startRemoteVsCodeEvent?: IGenericReturn | null;
  cloneProjectWorkerEvent?: IGenericReturn | null;
}

export interface ICLITokenType {
  __typename?: 'CLITokenType';
  id?: string | null;
  token?: string | null;
  user_id?: string | null;
  active?: boolean | null;
}

export interface IRemotePubsubType {
  __typename?: 'RemotePubsubType';
  status?: string | null;
}

export interface ILinodeCreateInstanceInputType {
  backup_id?: number | null;
  backups_enabled?: boolean | null;
  swap_size?: number | null;
  type: string;
  region: string;
  image: string;
  root_pass: string;
  authorized_keys?: Array<string> | null;
  stackscript_id?: number | null;
  stackscript_data?: string | null;
  booted?: boolean | null;
  label?: string | null;
  tags?: Array<string> | null;
  group?: string | null;
  private_ip?: boolean | null;
  authorized_users?: Array<string> | null;
}

export interface IStackcsriptInputType {
  label: string;
  description?: string | null;
  is_public?: boolean | null;
  rev_note?: string | null;
  script?: Array<string> | null;
  images: Array<string>;
}

export type IInstanceCommandsEnum = 'START_VS_CODE' | 'REMOVE_VS_CODE';

export interface IGenericReturn {
  __typename?: 'GenericReturn';
  status?: string | null;
}

export interface IRemoveVsCodeInputArguments {
  specifier?: string;
}

export interface IStartVsCodePayload {
  specifier: string;
  password: string;
  folder: string;
  ports: Array<string>;
  force?: boolean | null;
  image?: string | null;
}

export interface ICloneProjectWorkerPayload {
  specifier?: string;
}

/**
    description?: Subscription type for all subscriptions via pub sub
  */
export interface ISubscription {
  __typename?: 'Subscription';
  subscribeToCreateProject?: IProjectType | null;
  subscribeToCreateTeam?: ITeamType | null;
  notifications?: INotificationsType | null;
  registerInstance?: IInstanceConnectionType | null;
  registerWorker?: IInstanceConnectionType | null;
}

export interface INotificationsType {
  __typename?: 'NotificationsType';
  appUpdated?: string | null;
}

export interface IInstanceConnectionType {
  __typename?: 'InstanceConnectionType';
  command?: number | null;
  args?: string | null;
}

export type ILanguageCodeEnum = 'EN' | 'FR' | 'BG';

// tslint:enable
