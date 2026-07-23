/* eslint-disable no-unused-vars */
import createClient from 'openapi-fetch';

import * as apiPaths from './api-paths';
import type { operations, paths } from './schema';
import type {
  Conversation,
  ConversationResource,
  SDKOperationInit,
  SDKOperationResponse,
  SDKRequestInit,
  SDKResponse,
} from './types';

export interface SDKOptions {
  baseUrl: string;
  apiKey?: string;
  token?: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}

/** Methods exposed by `createSDK` (explicit shape avoids TS emit limits on the inferred return type). */
export interface DIAL_SDK {
  acceptUserConsent: (
    deployment_id: string,
    init: SDKOperationInit<operations['acceptUserConsent']>,
  ) => Promise<SDKOperationResponse<operations['acceptUserConsent']>>;
  applyConfigManifests: (
    init: SDKOperationInit<operations['applyConfigManifests']>,
  ) => Promise<SDKOperationResponse<operations['applyConfigManifests']>>;
  approvePublication: (
    init: SDKOperationInit<operations['approvePublication']>,
  ) => Promise<SDKOperationResponse<operations['approvePublication']>>;
  cancelResponseItem: (
    response_id: string,
    init?: SDKOperationInit<operations['cancelResponseItem']>,
  ) => Promise<SDKOperationResponse<operations['cancelResponseItem']>>;
  closeSession: (
    init: SDKOperationInit<operations['closeSession']>,
  ) => Promise<SDKOperationResponse<operations['closeSession']>>;
  configurationDeployment: (
    deployment_name: string,
    init?: SDKOperationInit<operations['configurationDeployment']>,
  ) => Promise<SDKOperationResponse<operations['configurationDeployment']>>;
  copyResource: (
    init: SDKOperationInit<operations['copyResource']>,
  ) => Promise<SDKOperationResponse<operations['copyResource']>>;
  copySharedResources: (
    init: SDKOperationInit<operations['copySharedResources']>,
  ) => Promise<SDKOperationResponse<operations['copySharedResources']>>;
  countAnthropicMessageTokens: (
    init: SDKOperationInit<operations['countAnthropicMessageTokens']>,
  ) => Promise<SDKOperationResponse<operations['countAnthropicMessageTokens']>>;
  createAnthropicMessage: (
    init: SDKOperationInit<operations['createAnthropicMessage']>,
  ) => Promise<SDKOperationResponse<operations['createAnthropicMessage']>>;
  createCompletion: (
    deployment_name: string,
    init: SDKOperationInit<operations['createCompletion']>,
  ) => Promise<SDKOperationResponse<operations['createCompletion']>>;
  createEmbedding: (
    deployment_name: string,
    init: SDKOperationInit<operations['createEmbedding']>,
  ) => Promise<SDKOperationResponse<operations['createEmbedding']>>;
  createPublication: (
    init: SDKOperationInit<operations['createPublication']>,
  ) => Promise<SDKOperationResponse<operations['createPublication']>>;
  createResponse: (
    init: SDKOperationInit<operations['createResponse']>,
  ) => Promise<SDKOperationResponse<operations['createResponse']>>;
  createSkillGroupingFolder: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['createSkillGroupingFolder']>,
  ) => Promise<SDKOperationResponse<operations['createSkillGroupingFolder']>>;
  deleteConversation: (
    bucket: string,
    conversation_path: string,
    init?: SDKOperationInit<operations['deleteConversation']>,
  ) => Promise<SDKOperationResponse<operations['deleteConversation']>>;
  deleteCustomApplication: (
    bucket: string,
    application_path: string,
    init?: SDKOperationInit<operations['deleteCustomApplication']>,
  ) => Promise<SDKOperationResponse<operations['deleteCustomApplication']>>;
  deleteExternalService: (
    appid: string,
    id: string,
    init?: SDKOperationInit<operations['deleteExternalService']>,
  ) => Promise<SDKOperationResponse<operations['deleteExternalService']>>;
  deleteFile: (
    bucket: string,
    file_path: string,
    init?: SDKOperationInit<operations['deleteFile']>,
  ) => Promise<SDKOperationResponse<operations['deleteFile']>>;
  deleteGlobalSettings: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteGlobalSettings']>,
  ) => Promise<SDKOperationResponse<operations['deleteGlobalSettings']>>;
  deleteInterceptor: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteInterceptor']>,
  ) => Promise<SDKOperationResponse<operations['deleteInterceptor']>>;
  deleteInvitation: (
    invitation_id: string,
    init?: SDKOperationInit<operations['deleteInvitation']>,
  ) => Promise<SDKOperationResponse<operations['deleteInvitation']>>;
  deleteKey: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteKey']>,
  ) => Promise<SDKOperationResponse<operations['deleteKey']>>;
  deleteModel: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteModel']>,
  ) => Promise<SDKOperationResponse<operations['deleteModel']>>;
  deleteNotifications: (
    init: SDKOperationInit<operations['deleteNotifications']>,
  ) => Promise<SDKOperationResponse<operations['deleteNotifications']>>;
  deletePrompt: (
    bucket: string,
    prompt_path: string,
    init?: SDKOperationInit<operations['deletePrompt']>,
  ) => Promise<SDKOperationResponse<operations['deletePrompt']>>;
  deletePublication: (
    init: SDKOperationInit<operations['deletePublication']>,
  ) => Promise<SDKOperationResponse<operations['deletePublication']>>;
  deleteResponseItem: (
    response_id: string,
    init?: SDKOperationInit<operations['deleteResponseItem']>,
  ) => Promise<SDKOperationResponse<operations['deleteResponseItem']>>;
  deleteRole: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteRole']>,
  ) => Promise<SDKOperationResponse<operations['deleteRole']>>;
  deleteRoute: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteRoute']>,
  ) => Promise<SDKOperationResponse<operations['deleteRoute']>>;
  deleteSchema: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteSchema']>,
  ) => Promise<SDKOperationResponse<operations['deleteSchema']>>;
  deleteSkillFile: (
    bucket: string,
    path: string,
    filepath: string,
    init?: SDKOperationInit<operations['deleteSkillFile']>,
  ) => Promise<SDKOperationResponse<operations['deleteSkillFile']>>;
  deleteSkillFolder: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteSkillFolder']>,
  ) => Promise<SDKOperationResponse<operations['deleteSkillFolder']>>;
  deleteSkillGroupingFolder: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['deleteSkillGroupingFolder']>,
  ) => Promise<SDKOperationResponse<operations['deleteSkillGroupingFolder']>>;
  deleteToolSet: (
    bucket: string,
    toolset_path: string,
    init?: SDKOperationInit<operations['deleteToolSet']>,
  ) => Promise<SDKOperationResponse<operations['deleteToolSet']>>;
  deleteToolSetMcp: (
    toolset_name: string,
    init?: SDKOperationInit<operations['deleteToolSetMcp']>,
  ) => Promise<SDKOperationResponse<operations['deleteToolSetMcp']>>;
  deployApplication: (
    init: SDKOperationInit<operations['deployApplication']>,
  ) => Promise<SDKOperationResponse<operations['deployApplication']>>;
  discardSharedResources: (
    init: SDKOperationInit<operations['discardSharedResources']>,
  ) => Promise<SDKOperationResponse<operations['discardSharedResources']>>;
  downloadFile: (
    bucket: string,
    file_path: string,
    init?: SDKOperationInit<operations['downloadFile']>,
  ) => Promise<SDKOperationResponse<operations['downloadFile']>>;
  downloadFileFromCodeInterpreter: (
    init: SDKOperationInit<operations['downloadFileFromCodeInterpreter']>,
  ) => Promise<
    SDKOperationResponse<operations['downloadFileFromCodeInterpreter']>
  >;
  downloadSkillFile: (
    bucket: string,
    path: string,
    filepath: string,
    init?: SDKOperationInit<operations['downloadSkillFile']>,
  ) => Promise<SDKOperationResponse<operations['downloadSkillFile']>>;
  downloadSkillFolder: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['downloadSkillFolder']>,
  ) => Promise<SDKOperationResponse<operations['downloadSkillFolder']>>;
  downloadSkillGroupingFolder: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['downloadSkillGroupingFolder']>,
  ) => Promise<SDKOperationResponse<operations['downloadSkillGroupingFolder']>>;
  executeCode: (
    init: SDKOperationInit<operations['executeCode']>,
  ) => Promise<SDKOperationResponse<operations['executeCode']>>;
  externalServiceGetCredentials: (
    init: SDKOperationInit<operations['externalServiceGetCredentials']>,
  ) => Promise<
    SDKOperationResponse<operations['externalServiceGetCredentials']>
  >;
  externalServiceGetOboCredentials: (
    init: SDKOperationInit<operations['externalServiceGetOboCredentials']>,
  ) => Promise<
    SDKOperationResponse<operations['externalServiceGetOboCredentials']>
  >;
  externalServiceSignIn: (
    init: SDKOperationInit<operations['externalServiceSignIn']>,
  ) => Promise<SDKOperationResponse<operations['externalServiceSignIn']>>;
  externalServiceSignOut: (
    init: SDKOperationInit<operations['externalServiceSignOut']>,
  ) => Promise<SDKOperationResponse<operations['externalServiceSignOut']>>;
  getApplication: (
    application_name: string,
    init?: SDKOperationInit<operations['getApplication']>,
  ) => Promise<SDKOperationResponse<operations['getApplication']>>;
  getApplicationLogs: (
    init: SDKOperationInit<operations['getApplicationLogs']>,
  ) => Promise<SDKOperationResponse<operations['getApplicationLogs']>>;
  getApplicationMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getApplicationMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getApplicationMetadata']>>;
  getApplications: (
    init?: SDKOperationInit<operations['getApplications']>,
  ) => Promise<SDKOperationResponse<operations['getApplications']>>;
  getConfigHealth: (
    init?: SDKOperationInit<operations['getConfigHealth']>,
  ) => Promise<SDKOperationResponse<operations['getConfigHealth']>>;
  getConversation: (
    bucket: string,
    conversation_path: string,
    init?: SDKRequestInit,
  ) => Promise<SDKResponse<Conversation>>;
  getConversationMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getConversationMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getConversationMetadata']>>;
  getCustomApplication: (
    bucket: string,
    application_path: string,
    init?: SDKOperationInit<operations['getCustomApplication']>,
  ) => Promise<SDKOperationResponse<operations['getCustomApplication']>>;
  getCustomApplicationSchema: (
    init: SDKOperationInit<operations['getCustomApplicationSchema']>,
  ) => Promise<SDKOperationResponse<operations['getCustomApplicationSchema']>>;
  getCustomToolSet: (
    bucket: string,
    toolset_path: string,
    init?: SDKOperationInit<operations['getCustomToolSet']>,
  ) => Promise<SDKOperationResponse<operations['getCustomToolSet']>>;
  getDeployment: (
    deployment_name: string,
    init?: SDKOperationInit<operations['getDeployment']>,
  ) => Promise<SDKOperationResponse<operations['getDeployment']>>;
  getDeploymentLimits: (
    deployment_name: string,
    init?: SDKOperationInit<operations['getDeploymentLimits']>,
  ) => Promise<SDKOperationResponse<operations['getDeploymentLimits']>>;
  getDeployments: (
    init?: SDKOperationInit<operations['getDeployments']>,
  ) => Promise<SDKOperationResponse<operations['getDeployments']>>;
  getExternalService: (
    appid: string,
    id: string,
    init?: SDKOperationInit<operations['getExternalService']>,
  ) => Promise<SDKOperationResponse<operations['getExternalService']>>;
  getFileConfigApplication: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigApplication']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigApplication']>>;
  getFileConfigInterceptor: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigInterceptor']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigInterceptor']>>;
  getFileConfigKey: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigKey']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigKey']>>;
  getFileConfigModel: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigModel']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigModel']>>;
  getFileConfigRole: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigRole']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigRole']>>;
  getFileConfigRoute: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigRoute']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigRoute']>>;
  getFileConfigSchema: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigSchema']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigSchema']>>;
  getFileConfigSettings: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigSettings']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigSettings']>>;
  getFileConfigToolset: (
    name: string,
    init?: SDKOperationInit<operations['getFileConfigToolset']>,
  ) => Promise<SDKOperationResponse<operations['getFileConfigToolset']>>;
  getFileMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getFileMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getFileMetadata']>>;
  getGlobalSettings: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getGlobalSettings']>,
  ) => Promise<SDKOperationResponse<operations['getGlobalSettings']>>;
  getGlobalSettingsMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getGlobalSettingsMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getGlobalSettingsMetadata']>>;
  getInterceptor: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getInterceptor']>,
  ) => Promise<SDKOperationResponse<operations['getInterceptor']>>;
  getInterceptorMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getInterceptorMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getInterceptorMetadata']>>;
  getInvitation: (
    invitation_id: string,
    init?: SDKOperationInit<operations['getInvitation']>,
  ) => Promise<SDKOperationResponse<operations['getInvitation']>>;
  getInvitations: (
    init?: SDKOperationInit<operations['getInvitations']>,
  ) => Promise<SDKOperationResponse<operations['getInvitations']>>;
  getKey: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getKey']>,
  ) => Promise<SDKOperationResponse<operations['getKey']>>;
  getKeyMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getKeyMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getKeyMetadata']>>;
  getMetaSchemaOfCustomApplicationSchema: (
    init?: SDKOperationInit<
      operations['getMetaSchemaOfCustomApplicationSchema']
    >,
  ) => Promise<
    SDKOperationResponse<operations['getMetaSchemaOfCustomApplicationSchema']>
  >;
  getModel: (
    model_name: string,
    init?: SDKOperationInit<operations['getModel']>,
  ) => Promise<SDKOperationResponse<operations['getModel']>>;
  getModelByPath: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getModelByPath']>,
  ) => Promise<SDKOperationResponse<operations['getModelByPath']>>;
  getModelMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getModelMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getModelMetadata']>>;
  getModels: (
    init?: SDKOperationInit<operations['getModels']>,
  ) => Promise<SDKOperationResponse<operations['getModels']>>;
  getNotifications: (
    init?: SDKOperationInit<operations['getNotifications']>,
  ) => Promise<SDKOperationResponse<operations['getNotifications']>>;
  getPerRequestPermissions: (
    init: SDKOperationInit<operations['getPerRequestPermissions']>,
  ) => Promise<SDKOperationResponse<operations['getPerRequestPermissions']>>;
  getPrompt: (
    bucket: string,
    prompt_path: string,
    init?: SDKOperationInit<operations['getPrompt']>,
  ) => Promise<SDKOperationResponse<operations['getPrompt']>>;
  getPromptMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getPromptMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getPromptMetadata']>>;
  getPublication: (
    init: SDKOperationInit<operations['getPublication']>,
  ) => Promise<SDKOperationResponse<operations['getPublication']>>;
  getPublicationRules: (
    init: SDKOperationInit<operations['getPublicationRules']>,
  ) => Promise<SDKOperationResponse<operations['getPublicationRules']>>;
  getPublications: (
    init: SDKOperationInit<operations['getPublications']>,
  ) => Promise<SDKOperationResponse<operations['getPublications']>>;
  getResponseItem: (
    response_id: string,
    init?: SDKOperationInit<operations['getResponseItem']>,
  ) => Promise<SDKOperationResponse<operations['getResponseItem']>>;
  getRole: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getRole']>,
  ) => Promise<SDKOperationResponse<operations['getRole']>>;
  getRoleMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getRoleMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getRoleMetadata']>>;
  getRoute: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getRoute']>,
  ) => Promise<SDKOperationResponse<operations['getRoute']>>;
  getRouteMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getRouteMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getRouteMetadata']>>;
  getSchema: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getSchema']>,
  ) => Promise<SDKOperationResponse<operations['getSchema']>>;
  getSchemaMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getSchemaMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getSchemaMetadata']>>;
  getSession: (
    init: SDKOperationInit<operations['getSession']>,
  ) => Promise<SDKOperationResponse<operations['getSession']>>;
  getSharedResources: (
    init: SDKOperationInit<operations['getSharedResources']>,
  ) => Promise<SDKOperationResponse<operations['getSharedResources']>>;
  getToolSetAllowedTools: (
    toolset_name: string,
    init?: SDKOperationInit<operations['getToolSetAllowedTools']>,
  ) => Promise<SDKOperationResponse<operations['getToolSetAllowedTools']>>;
  getToolSetMcp: (
    toolset_name: string,
    init?: SDKOperationInit<operations['getToolSetMcp']>,
  ) => Promise<SDKOperationResponse<operations['getToolSetMcp']>>;
  getToolSetMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getToolSetMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getToolSetMetadata']>>;
  getToolSetTools: (
    toolset_name: string,
    init?: SDKOperationInit<operations['getToolSetTools']>,
  ) => Promise<SDKOperationResponse<operations['getToolSetTools']>>;
  getToolSets: (
    init?: SDKOperationInit<operations['getToolSets']>,
  ) => Promise<SDKOperationResponse<operations['getToolSets']>>;
  getToolset: (
    toolset_name: string,
    init?: SDKOperationInit<operations['getToolset']>,
  ) => Promise<SDKOperationResponse<operations['getToolset']>>;
  getUserBucket: (
    init?: SDKOperationInit<operations['getUserBucket']>,
  ) => Promise<SDKOperationResponse<operations['getUserBucket']>>;
  getUserInfo: (
    init?: SDKOperationInit<operations['getUserInfo']>,
  ) => Promise<SDKOperationResponse<operations['getUserInfo']>>;
  grantPerRequestPermissions: (
    init: SDKOperationInit<operations['grantPerRequestPermissions']>,
  ) => Promise<SDKOperationResponse<operations['grantPerRequestPermissions']>>;
  interactClientChannel: (
    init: SDKOperationInit<operations['interactClientChannel']>,
  ) => Promise<SDKOperationResponse<operations['interactClientChannel']>>;
  listCustomApplicationSchemas: (
    init?: SDKOperationInit<operations['listCustomApplicationSchemas']>,
  ) => Promise<
    SDKOperationResponse<operations['listCustomApplicationSchemas']>
  >;
  listDeployments: (
    init?: SDKOperationInit<operations['listDeployments']>,
  ) => Promise<SDKOperationResponse<operations['listDeployments']>>;
  listExternalServices: (
    appid: string,
    init?: SDKOperationInit<operations['listExternalServices']>,
  ) => Promise<SDKOperationResponse<operations['listExternalServices']>>;
  listFileConfigApplications: (
    init?: SDKOperationInit<operations['listFileConfigApplications']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigApplications']>>;
  listFileConfigInterceptors: (
    init?: SDKOperationInit<operations['listFileConfigInterceptors']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigInterceptors']>>;
  listFileConfigKeys: (
    init?: SDKOperationInit<operations['listFileConfigKeys']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigKeys']>>;
  listFileConfigModels: (
    init?: SDKOperationInit<operations['listFileConfigModels']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigModels']>>;
  listFileConfigRoles: (
    init?: SDKOperationInit<operations['listFileConfigRoles']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigRoles']>>;
  listFileConfigRoutes: (
    init?: SDKOperationInit<operations['listFileConfigRoutes']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigRoutes']>>;
  listFileConfigSchemas: (
    init?: SDKOperationInit<operations['listFileConfigSchemas']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigSchemas']>>;
  listFileConfigSettings: (
    init?: SDKOperationInit<operations['listFileConfigSettings']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigSettings']>>;
  listFileConfigToolsets: (
    init?: SDKOperationInit<operations['listFileConfigToolsets']>,
  ) => Promise<SDKOperationResponse<operations['listFileConfigToolsets']>>;
  listFilesFromCodeInterpreter: (
    init: SDKOperationInit<operations['listFilesFromCodeInterpreter']>,
  ) => Promise<
    SDKOperationResponse<operations['listFilesFromCodeInterpreter']>
  >;
  listPublishedResources: (
    init: SDKOperationInit<operations['listPublishedResources']>,
  ) => Promise<SDKOperationResponse<operations['listPublishedResources']>>;
  listSkillFileMetadata: (
    bucket: string,
    path: string,
    filepath: string,
    init?: SDKOperationInit<operations['listSkillFileMetadata']>,
  ) => Promise<SDKOperationResponse<operations['listSkillFileMetadata']>>;
  listSkillMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['listSkillMetadata']>,
  ) => Promise<SDKOperationResponse<operations['listSkillMetadata']>>;
  moveResource: (
    init: SDKOperationInit<operations['moveResource']>,
  ) => Promise<SDKOperationResponse<operations['moveResource']>>;
  openSession: (
    init: SDKOperationInit<operations['openSession']>,
  ) => Promise<SDKOperationResponse<operations['openSession']>>;
  postApplicationMcp: (
    deployment_name: string,
    init: SDKOperationInit<operations['postApplicationMcp']>,
  ) => Promise<SDKOperationResponse<operations['postApplicationMcp']>>;
  postToolSetMcp: (
    toolset_name: string,
    init: SDKOperationInit<operations['postToolSetMcp']>,
  ) => Promise<SDKOperationResponse<operations['postToolSetMcp']>>;
  putExternalService: (
    appid: string,
    id: string,
    init: SDKOperationInit<operations['putExternalService']>,
  ) => Promise<SDKOperationResponse<operations['putExternalService']>>;
  rateDeployment: (
    deployment_name: string,
    init: SDKOperationInit<operations['rateDeployment']>,
  ) => Promise<SDKOperationResponse<operations['rateDeployment']>>;
  redeployApplication: (
    init: SDKOperationInit<operations['redeployApplication']>,
  ) => Promise<SDKOperationResponse<operations['redeployApplication']>>;
  rejectPublication: (
    init: SDKOperationInit<operations['rejectPublication']>,
  ) => Promise<SDKOperationResponse<operations['rejectPublication']>>;
  reloadConfig: (
    init?: SDKOperationInit<operations['reloadConfig']>,
  ) => Promise<SDKOperationResponse<operations['reloadConfig']>>;
  repairToolSet: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['repairToolSet']>,
  ) => Promise<SDKOperationResponse<operations['repairToolSet']>>;
  reportClientChannel: (
    init: SDKOperationInit<operations['reportClientChannel']>,
  ) => Promise<SDKOperationResponse<operations['reportClientChannel']>>;
  requestUserConsent: (
    deployment_id: string,
    init?: SDKOperationInit<operations['requestUserConsent']>,
  ) => Promise<SDKOperationResponse<operations['requestUserConsent']>>;
  revokePerRequestPermissions: (
    init: SDKOperationInit<operations['revokePerRequestPermissions']>,
  ) => Promise<SDKOperationResponse<operations['revokePerRequestPermissions']>>;
  revokeSharedResources: (
    init: SDKOperationInit<operations['revokeSharedResources']>,
  ) => Promise<SDKOperationResponse<operations['revokeSharedResources']>>;
  saveConversation: (
    bucket: string,
    conversation_path: string,
    init: SDKRequestInit<Conversation> & { body: Conversation },
  ) => Promise<SDKResponse<ConversationResource>>;
  saveCustomApplication: (
    bucket: string,
    application_path: string,
    init: SDKOperationInit<operations['saveCustomApplication']>,
  ) => Promise<SDKOperationResponse<operations['saveCustomApplication']>>;
  saveGlobalSettings: (
    bucket: string,
    path: string,
    init: SDKOperationInit<operations['saveGlobalSettings']>,
  ) => Promise<SDKOperationResponse<operations['saveGlobalSettings']>>;
  saveInterceptor: (
    bucket: string,
    path: string,
    init: SDKOperationInit<operations['saveInterceptor']>,
  ) => Promise<SDKOperationResponse<operations['saveInterceptor']>>;
  saveKey: (
    bucket: string,
    path: string,
    init: SDKOperationInit<operations['saveKey']>,
  ) => Promise<SDKOperationResponse<operations['saveKey']>>;
  saveModel: (
    bucket: string,
    path: string,
    init: SDKOperationInit<operations['saveModel']>,
  ) => Promise<SDKOperationResponse<operations['saveModel']>>;
  savePrompt: (
    bucket: string,
    prompt_path: string,
    init: SDKOperationInit<operations['savePrompt']>,
  ) => Promise<SDKOperationResponse<operations['savePrompt']>>;
  saveRole: (
    bucket: string,
    path: string,
    init: SDKOperationInit<operations['saveRole']>,
  ) => Promise<SDKOperationResponse<operations['saveRole']>>;
  saveRoute: (
    bucket: string,
    path: string,
    init: SDKOperationInit<operations['saveRoute']>,
  ) => Promise<SDKOperationResponse<operations['saveRoute']>>;
  saveSchema: (
    bucket: string,
    path: string,
    init: SDKOperationInit<operations['saveSchema']>,
  ) => Promise<SDKOperationResponse<operations['saveSchema']>>;
  saveToolSet: (
    bucket: string,
    toolset_path: string,
    init: SDKOperationInit<operations['saveToolSet']>,
  ) => Promise<SDKOperationResponse<operations['saveToolSet']>>;
  sendChatCompletionRequest: (
    deployment_name: string,
    init: SDKOperationInit<operations['sendChatCompletionRequest']>,
  ) => Promise<SDKOperationResponse<operations['sendChatCompletionRequest']>>;
  shareResource: (
    init: SDKOperationInit<operations['shareResource']>,
  ) => Promise<SDKOperationResponse<operations['shareResource']>>;
  subscribeClientChannel: (
    init?: SDKOperationInit<operations['subscribeClientChannel']>,
  ) => Promise<SDKOperationResponse<operations['subscribeClientChannel']>>;
  subscribeToResources: (
    init: SDKOperationInit<operations['subscribeToResources']>,
  ) => Promise<SDKOperationResponse<operations['subscribeToResources']>>;
  tokenize: (
    deployment_name: string,
    init: SDKOperationInit<operations['tokenize']>,
  ) => Promise<SDKOperationResponse<operations['tokenize']>>;
  toolSetSignout: (
    init: SDKOperationInit<operations['toolSetSignout']>,
  ) => Promise<SDKOperationResponse<operations['toolSetSignout']>>;
  toolsetSignin: (
    init: SDKOperationInit<operations['toolsetSignin']>,
  ) => Promise<SDKOperationResponse<operations['toolsetSignin']>>;
  transferInputFile: (
    init: SDKOperationInit<operations['transferInputFile']>,
  ) => Promise<SDKOperationResponse<operations['transferInputFile']>>;
  transferOutputFile: (
    init: SDKOperationInit<operations['transferOutputFile']>,
  ) => Promise<SDKOperationResponse<operations['transferOutputFile']>>;
  truncatePrompt: (
    deployment_name: string,
    init: SDKOperationInit<operations['truncatePrompt']>,
  ) => Promise<SDKOperationResponse<operations['truncatePrompt']>>;
  undeployApplication: (
    init: SDKOperationInit<operations['undeployApplication']>,
  ) => Promise<SDKOperationResponse<operations['undeployApplication']>>;
  unsubscribeClientChannel: (
    init: SDKOperationInit<operations['unsubscribeClientChannel']>,
  ) => Promise<SDKOperationResponse<operations['unsubscribeClientChannel']>>;
  updatePublication: (
    init: SDKOperationInit<operations['updatePublication']>,
  ) => Promise<SDKOperationResponse<operations['updatePublication']>>;
  uploadFile: (
    bucket: string,
    file_path: string,
    init: SDKOperationInit<operations['uploadFile']>,
  ) => Promise<SDKOperationResponse<operations['uploadFile']>>;
  uploadFileToCodeInterpreter: (
    init: SDKOperationInit<operations['uploadFileToCodeInterpreter']>,
  ) => Promise<SDKOperationResponse<operations['uploadFileToCodeInterpreter']>>;
  uploadSkillFile: (
    bucket: string,
    path: string,
    filepath: string,
    init: SDKOperationInit<operations['uploadSkillFile']>,
  ) => Promise<SDKOperationResponse<operations['uploadSkillFile']>>;
  uploadSkillFolder: (
    bucket: string,
    path: string,
    init: SDKOperationInit<operations['uploadSkillFolder']>,
  ) => Promise<SDKOperationResponse<operations['uploadSkillFolder']>>;
  validateConfigManifests: (
    init: SDKOperationInit<operations['validateConfigManifests']>,
  ) => Promise<SDKOperationResponse<operations['validateConfigManifests']>>;
}

export function createSDK(opts: SDKOptions): DIAL_SDK {
  const client = createClient<paths>({
    baseUrl: opts.baseUrl,
    headers: {
      ...(opts.apiKey ? { 'Api-Key': opts.apiKey } : {}),
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
      ...(opts.headers ?? {}),
    },
    fetch: opts.fetch,
  });

  return {
    acceptUserConsent: (deployment_id: string, init?: any) =>
      client.POST(
        apiPaths.acceptUserConsentUrl(deployment_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['acceptUserConsent']>>,
    applyConfigManifests: (init?: any) =>
      client.POST(apiPaths.applyConfigManifestsUrl, init) as Promise<
        SDKOperationResponse<operations['applyConfigManifests']>
      >,
    approvePublication: (init?: any) =>
      client.POST(apiPaths.approvePublicationUrl, init) as Promise<
        SDKOperationResponse<operations['approvePublication']>
      >,
    cancelResponseItem: (response_id: string, init?: any) =>
      client.POST(
        apiPaths.cancelResponseItemUrl(response_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['cancelResponseItem']>>,
    closeSession: (init?: any) =>
      client.POST(apiPaths.closeSessionUrl, init) as Promise<
        SDKOperationResponse<operations['closeSession']>
      >,
    configurationDeployment: (deployment_name: string, init?: any) =>
      client.GET(
        apiPaths.configurationDeploymentUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['configurationDeployment']>>,
    copyResource: (init?: any) =>
      client.POST(apiPaths.copyResourceUrl, init) as Promise<
        SDKOperationResponse<operations['copyResource']>
      >,
    copySharedResources: (init?: any) =>
      client.POST(apiPaths.copySharedResourcesUrl, init) as Promise<
        SDKOperationResponse<operations['copySharedResources']>
      >,
    countAnthropicMessageTokens: (init?: any) =>
      client.POST(apiPaths.countAnthropicMessageTokensUrl, init) as Promise<
        SDKOperationResponse<operations['countAnthropicMessageTokens']>
      >,
    createAnthropicMessage: (init?: any) =>
      client.POST(apiPaths.createAnthropicMessageUrl, init) as Promise<
        SDKOperationResponse<operations['createAnthropicMessage']>
      >,
    createCompletion: (deployment_name: string, init?: any) =>
      client.POST(
        apiPaths.createCompletionUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['createCompletion']>>,
    createEmbedding: (deployment_name: string, init?: any) =>
      client.POST(
        apiPaths.createEmbeddingUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['createEmbedding']>>,
    createPublication: (init?: any) =>
      client.POST(apiPaths.createPublicationUrl, init) as Promise<
        SDKOperationResponse<operations['createPublication']>
      >,
    createResponse: (init?: any) =>
      client.POST(apiPaths.createResponseUrl, init) as Promise<
        SDKOperationResponse<operations['createResponse']>
      >,
    createSkillGroupingFolder: (bucket: string, path: string, init?: any) =>
      client.PUT(
        apiPaths.createSkillGroupingFolderUrl(bucket, path) as any,
        init,
      ) as Promise<
        SDKOperationResponse<operations['createSkillGroupingFolder']>
      >,
    deleteConversation: (
      bucket: string,
      conversation_path: string,
      init?: any,
    ) =>
      client.DELETE(
        apiPaths.deleteConversationUrl(bucket, conversation_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteConversation']>>,
    deleteCustomApplication: (
      bucket: string,
      application_path: string,
      init?: any,
    ) =>
      client.DELETE(
        apiPaths.deleteCustomApplicationUrl(bucket, application_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteCustomApplication']>>,
    deleteExternalService: (appid: string, id: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteExternalServiceUrl(appid, id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteExternalService']>>,
    deleteFile: (bucket: string, file_path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteFileUrl(bucket, file_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteFile']>>,
    deleteGlobalSettings: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteGlobalSettingsUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteGlobalSettings']>>,
    deleteInterceptor: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteInterceptorUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteInterceptor']>>,
    deleteInvitation: (invitation_id: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteInvitationUrl(invitation_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteInvitation']>>,
    deleteKey: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteKeyUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteKey']>>,
    deleteModel: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteModelUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteModel']>>,
    deleteNotifications: (init?: any) =>
      client.POST(apiPaths.deleteNotificationsUrl, init) as Promise<
        SDKOperationResponse<operations['deleteNotifications']>
      >,
    deletePrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.DELETE(
        apiPaths.deletePromptUrl(bucket, prompt_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deletePrompt']>>,
    deletePublication: (init?: any) =>
      client.POST(apiPaths.deletePublicationUrl, init) as Promise<
        SDKOperationResponse<operations['deletePublication']>
      >,
    deleteResponseItem: (response_id: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteResponseItemUrl(response_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteResponseItem']>>,
    deleteRole: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteRoleUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteRole']>>,
    deleteRoute: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteRouteUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteRoute']>>,
    deleteSchema: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteSchemaUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteSchema']>>,
    deleteSkillFile: (
      bucket: string,
      path: string,
      filepath: string,
      init?: any,
    ) =>
      client.DELETE(
        apiPaths.deleteSkillFileUrl(bucket, path, filepath) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteSkillFile']>>,
    deleteSkillFolder: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteSkillFolderUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteSkillFolder']>>,
    deleteSkillGroupingFolder: (bucket: string, path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteSkillGroupingFolderUrl(bucket, path) as any,
        init,
      ) as Promise<
        SDKOperationResponse<operations['deleteSkillGroupingFolder']>
      >,
    deleteToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteToolSetUrl(bucket, toolset_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteToolSet']>>,
    deleteToolSetMcp: (toolset_name: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteToolSetMcpUrl(toolset_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteToolSetMcp']>>,
    deployApplication: (init?: any) =>
      client.POST(apiPaths.deployApplicationUrl, init) as Promise<
        SDKOperationResponse<operations['deployApplication']>
      >,
    discardSharedResources: (init?: any) =>
      client.POST(apiPaths.discardSharedResourcesUrl, init) as Promise<
        SDKOperationResponse<operations['discardSharedResources']>
      >,
    downloadFile: (bucket: string, file_path: string, init?: any) =>
      client.GET(
        apiPaths.downloadFileUrl(bucket, file_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['downloadFile']>>,
    downloadFileFromCodeInterpreter: (init?: any) =>
      client.POST(apiPaths.downloadFileFromCodeInterpreterUrl, init) as Promise<
        SDKOperationResponse<operations['downloadFileFromCodeInterpreter']>
      >,
    downloadSkillFile: (
      bucket: string,
      path: string,
      filepath: string,
      init?: any,
    ) =>
      client.GET(
        apiPaths.downloadSkillFileUrl(bucket, path, filepath) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['downloadSkillFile']>>,
    downloadSkillFolder: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.downloadSkillFolderUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['downloadSkillFolder']>>,
    downloadSkillGroupingFolder: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.downloadSkillGroupingFolderUrl(bucket, path) as any,
        init,
      ) as Promise<
        SDKOperationResponse<operations['downloadSkillGroupingFolder']>
      >,
    executeCode: (init?: any) =>
      client.POST(apiPaths.executeCodeUrl, init) as Promise<
        SDKOperationResponse<operations['executeCode']>
      >,
    externalServiceGetCredentials: (init?: any) =>
      client.POST(apiPaths.externalServiceGetCredentialsUrl, init) as Promise<
        SDKOperationResponse<operations['externalServiceGetCredentials']>
      >,
    externalServiceGetOboCredentials: (init?: any) =>
      client.POST(
        apiPaths.externalServiceGetOboCredentialsUrl,
        init,
      ) as Promise<
        SDKOperationResponse<operations['externalServiceGetOboCredentials']>
      >,
    externalServiceSignIn: (init?: any) =>
      client.POST(apiPaths.externalServiceSignInUrl, init) as Promise<
        SDKOperationResponse<operations['externalServiceSignIn']>
      >,
    externalServiceSignOut: (init?: any) =>
      client.POST(apiPaths.externalServiceSignOutUrl, init) as Promise<
        SDKOperationResponse<operations['externalServiceSignOut']>
      >,
    getApplication: (application_name: string, init?: any) =>
      client.GET(
        apiPaths.getApplicationUrl(application_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getApplication']>>,
    getApplicationLogs: (init?: any) =>
      client.POST(apiPaths.getApplicationLogsUrl, init) as Promise<
        SDKOperationResponse<operations['getApplicationLogs']>
      >,
    getApplicationMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getApplicationMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getApplicationMetadata']>>,
    getApplications: (init?: any) =>
      client.GET(apiPaths.getApplicationsUrl, init) as Promise<
        SDKOperationResponse<operations['getApplications']>
      >,
    getConfigHealth: (init?: any) =>
      client.GET(apiPaths.getConfigHealthUrl, init) as Promise<
        SDKOperationResponse<operations['getConfigHealth']>
      >,
    getConversation: (bucket: string, conversation_path: string, init?: any) =>
      client.GET(
        apiPaths.getConversationUrl(bucket, conversation_path) as any,
        init,
      ) as Promise<SDKResponse<Conversation>>,
    getConversationMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getConversationMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getConversationMetadata']>>,
    getCustomApplication: (
      bucket: string,
      application_path: string,
      init?: any,
    ) =>
      client.GET(
        apiPaths.getCustomApplicationUrl(bucket, application_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getCustomApplication']>>,
    getCustomApplicationSchema: (init?: any) =>
      client.GET(apiPaths.getCustomApplicationSchemaUrl, init) as Promise<
        SDKOperationResponse<operations['getCustomApplicationSchema']>
      >,
    getCustomToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.GET(
        apiPaths.getCustomToolSetUrl(bucket, toolset_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getCustomToolSet']>>,
    getDeployment: (deployment_name: string, init?: any) =>
      client.GET(
        apiPaths.getDeploymentUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getDeployment']>>,
    getDeploymentLimits: (deployment_name: string, init?: any) =>
      client.GET(
        apiPaths.getDeploymentLimitsUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getDeploymentLimits']>>,
    getDeployments: (init?: any) =>
      client.GET(apiPaths.getDeploymentsUrl, init) as Promise<
        SDKOperationResponse<operations['getDeployments']>
      >,
    getExternalService: (appid: string, id: string, init?: any) =>
      client.GET(
        apiPaths.getExternalServiceUrl(appid, id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getExternalService']>>,
    getFileConfigApplication: (name: string, init?: any) =>
      client.GET(
        apiPaths.getFileConfigApplicationUrl(name) as any,
        init,
      ) as Promise<
        SDKOperationResponse<operations['getFileConfigApplication']>
      >,
    getFileConfigInterceptor: (name: string, init?: any) =>
      client.GET(
        apiPaths.getFileConfigInterceptorUrl(name) as any,
        init,
      ) as Promise<
        SDKOperationResponse<operations['getFileConfigInterceptor']>
      >,
    getFileConfigKey: (name: string, init?: any) =>
      client.GET(apiPaths.getFileConfigKeyUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getFileConfigKey']>
      >,
    getFileConfigModel: (name: string, init?: any) =>
      client.GET(apiPaths.getFileConfigModelUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getFileConfigModel']>
      >,
    getFileConfigRole: (name: string, init?: any) =>
      client.GET(apiPaths.getFileConfigRoleUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getFileConfigRole']>
      >,
    getFileConfigRoute: (name: string, init?: any) =>
      client.GET(apiPaths.getFileConfigRouteUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getFileConfigRoute']>
      >,
    getFileConfigSchema: (name: string, init?: any) =>
      client.GET(apiPaths.getFileConfigSchemaUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getFileConfigSchema']>
      >,
    getFileConfigSettings: (name: string, init?: any) =>
      client.GET(
        apiPaths.getFileConfigSettingsUrl(name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getFileConfigSettings']>>,
    getFileConfigToolset: (name: string, init?: any) =>
      client.GET(
        apiPaths.getFileConfigToolsetUrl(name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getFileConfigToolset']>>,
    getFileMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getFileMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getFileMetadata']>>,
    getGlobalSettings: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getGlobalSettingsUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getGlobalSettings']>>,
    getGlobalSettingsMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getGlobalSettingsMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<
        SDKOperationResponse<operations['getGlobalSettingsMetadata']>
      >,
    getInterceptor: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getInterceptorUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getInterceptor']>>,
    getInterceptorMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getInterceptorMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getInterceptorMetadata']>>,
    getInvitation: (invitation_id: string, init?: any) =>
      client.GET(
        apiPaths.getInvitationUrl(invitation_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getInvitation']>>,
    getInvitations: (init?: any) =>
      client.GET(apiPaths.getInvitationsUrl, init) as Promise<
        SDKOperationResponse<operations['getInvitations']>
      >,
    getKey: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getKeyUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['getKey']>
      >,
    getKeyMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getKeyMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getKeyMetadata']>>,
    getMetaSchemaOfCustomApplicationSchema: (init?: any) =>
      client.GET(
        apiPaths.getMetaSchemaOfCustomApplicationSchemaUrl,
        init,
      ) as Promise<
        SDKOperationResponse<
          operations['getMetaSchemaOfCustomApplicationSchema']
        >
      >,
    getModel: (model_name: string, init?: any) =>
      client.GET(apiPaths.getModelUrl(model_name) as any, init) as Promise<
        SDKOperationResponse<operations['getModel']>
      >,
    getModelByPath: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getModelByPathUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getModelByPath']>>,
    getModelMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getModelMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getModelMetadata']>>,
    getModels: (init?: any) =>
      client.GET(apiPaths.getModelsUrl, init) as Promise<
        SDKOperationResponse<operations['getModels']>
      >,
    getNotifications: (init?: any) =>
      client.POST(apiPaths.getNotificationsUrl, init) as Promise<
        SDKOperationResponse<operations['getNotifications']>
      >,
    getPerRequestPermissions: (init?: any) =>
      client.POST(apiPaths.getPerRequestPermissionsUrl, init) as Promise<
        SDKOperationResponse<operations['getPerRequestPermissions']>
      >,
    getPrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.GET(
        apiPaths.getPromptUrl(bucket, prompt_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getPrompt']>>,
    getPromptMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getPromptMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getPromptMetadata']>>,
    getPublication: (init?: any) =>
      client.POST(apiPaths.getPublicationUrl, init) as Promise<
        SDKOperationResponse<operations['getPublication']>
      >,
    getPublicationRules: (init?: any) =>
      client.POST(apiPaths.getPublicationRulesUrl, init) as Promise<
        SDKOperationResponse<operations['getPublicationRules']>
      >,
    getPublications: (init?: any) =>
      client.POST(apiPaths.getPublicationsUrl, init) as Promise<
        SDKOperationResponse<operations['getPublications']>
      >,
    getResponseItem: (response_id: string, init?: any) =>
      client.GET(
        apiPaths.getResponseItemUrl(response_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getResponseItem']>>,
    getRole: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getRoleUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['getRole']>
      >,
    getRoleMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getRoleMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getRoleMetadata']>>,
    getRoute: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getRouteUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['getRoute']>
      >,
    getRouteMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getRouteMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getRouteMetadata']>>,
    getSchema: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getSchemaUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['getSchema']>
      >,
    getSchemaMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getSchemaMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getSchemaMetadata']>>,
    getSession: (init?: any) =>
      client.POST(apiPaths.getSessionUrl, init) as Promise<
        SDKOperationResponse<operations['getSession']>
      >,
    getSharedResources: (init?: any) =>
      client.POST(apiPaths.getSharedResourcesUrl, init) as Promise<
        SDKOperationResponse<operations['getSharedResources']>
      >,
    getToolSetAllowedTools: (toolset_name: string, init?: any) =>
      client.GET(
        apiPaths.getToolSetAllowedToolsUrl(toolset_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getToolSetAllowedTools']>>,
    getToolSetMcp: (toolset_name: string, init?: any) =>
      client.GET(
        apiPaths.getToolSetMcpUrl(toolset_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getToolSetMcp']>>,
    getToolSetMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getToolSetMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getToolSetMetadata']>>,
    getToolSetTools: (toolset_name: string, init?: any) =>
      client.GET(
        apiPaths.getToolSetToolsUrl(toolset_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getToolSetTools']>>,
    getToolSets: (init?: any) =>
      client.GET(apiPaths.getToolSetsUrl, init) as Promise<
        SDKOperationResponse<operations['getToolSets']>
      >,
    getToolset: (toolset_name: string, init?: any) =>
      client.GET(apiPaths.getToolsetUrl(toolset_name) as any, init) as Promise<
        SDKOperationResponse<operations['getToolset']>
      >,
    getUserBucket: (init?: any) =>
      client.GET(apiPaths.getUserBucketUrl, init) as Promise<
        SDKOperationResponse<operations['getUserBucket']>
      >,
    getUserInfo: (init?: any) =>
      client.GET(apiPaths.getUserInfoUrl, init) as Promise<
        SDKOperationResponse<operations['getUserInfo']>
      >,
    grantPerRequestPermissions: (init?: any) =>
      client.POST(apiPaths.grantPerRequestPermissionsUrl, init) as Promise<
        SDKOperationResponse<operations['grantPerRequestPermissions']>
      >,
    interactClientChannel: (init?: any) =>
      client.POST(apiPaths.interactClientChannelUrl, init) as Promise<
        SDKOperationResponse<operations['interactClientChannel']>
      >,
    listCustomApplicationSchemas: (init?: any) =>
      client.GET(apiPaths.listCustomApplicationSchemasUrl, init) as Promise<
        SDKOperationResponse<operations['listCustomApplicationSchemas']>
      >,
    listDeployments: (init?: any) =>
      client.GET(apiPaths.listDeploymentsUrl, init) as Promise<
        SDKOperationResponse<operations['listDeployments']>
      >,
    listExternalServices: (appid: string, init?: any) =>
      client.GET(
        apiPaths.listExternalServicesUrl(appid) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['listExternalServices']>>,
    listFileConfigApplications: (init?: any) =>
      client.GET(apiPaths.listFileConfigApplicationsUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigApplications']>
      >,
    listFileConfigInterceptors: (init?: any) =>
      client.GET(apiPaths.listFileConfigInterceptorsUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigInterceptors']>
      >,
    listFileConfigKeys: (init?: any) =>
      client.GET(apiPaths.listFileConfigKeysUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigKeys']>
      >,
    listFileConfigModels: (init?: any) =>
      client.GET(apiPaths.listFileConfigModelsUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigModels']>
      >,
    listFileConfigRoles: (init?: any) =>
      client.GET(apiPaths.listFileConfigRolesUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigRoles']>
      >,
    listFileConfigRoutes: (init?: any) =>
      client.GET(apiPaths.listFileConfigRoutesUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigRoutes']>
      >,
    listFileConfigSchemas: (init?: any) =>
      client.GET(apiPaths.listFileConfigSchemasUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigSchemas']>
      >,
    listFileConfigSettings: (init?: any) =>
      client.GET(apiPaths.listFileConfigSettingsUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigSettings']>
      >,
    listFileConfigToolsets: (init?: any) =>
      client.GET(apiPaths.listFileConfigToolsetsUrl, init) as Promise<
        SDKOperationResponse<operations['listFileConfigToolsets']>
      >,
    listFilesFromCodeInterpreter: (init?: any) =>
      client.POST(apiPaths.listFilesFromCodeInterpreterUrl, init) as Promise<
        SDKOperationResponse<operations['listFilesFromCodeInterpreter']>
      >,
    listPublishedResources: (init?: any) =>
      client.POST(apiPaths.listPublishedResourcesUrl, init) as Promise<
        SDKOperationResponse<operations['listPublishedResources']>
      >,
    listSkillFileMetadata: (
      bucket: string,
      path: string,
      filepath: string,
      init?: any,
    ) =>
      client.GET(
        apiPaths.listSkillFileMetadataUrl(bucket, path, filepath) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['listSkillFileMetadata']>>,
    listSkillMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.listSkillMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['listSkillMetadata']>>,
    moveResource: (init?: any) =>
      client.POST(apiPaths.moveResourceUrl, init) as Promise<
        SDKOperationResponse<operations['moveResource']>
      >,
    openSession: (init?: any) =>
      client.POST(apiPaths.openSessionUrl, init) as Promise<
        SDKOperationResponse<operations['openSession']>
      >,
    postApplicationMcp: (deployment_name: string, init?: any) =>
      client.POST(
        apiPaths.postApplicationMcpUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['postApplicationMcp']>>,
    postToolSetMcp: (toolset_name: string, init?: any) =>
      client.POST(
        apiPaths.postToolSetMcpUrl(toolset_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['postToolSetMcp']>>,
    putExternalService: (appid: string, id: string, init?: any) =>
      client.PUT(
        apiPaths.putExternalServiceUrl(appid, id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['putExternalService']>>,
    rateDeployment: (deployment_name: string, init?: any) =>
      client.POST(
        apiPaths.rateDeploymentUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['rateDeployment']>>,
    redeployApplication: (init?: any) =>
      client.POST(apiPaths.redeployApplicationUrl, init) as Promise<
        SDKOperationResponse<operations['redeployApplication']>
      >,
    rejectPublication: (init?: any) =>
      client.POST(apiPaths.rejectPublicationUrl, init) as Promise<
        SDKOperationResponse<operations['rejectPublication']>
      >,
    reloadConfig: (init?: any) =>
      client.POST(apiPaths.reloadConfigUrl, init) as Promise<
        SDKOperationResponse<operations['reloadConfig']>
      >,
    repairToolSet: (bucket: string, path: string, init?: any) =>
      client.POST(
        apiPaths.repairToolSetUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['repairToolSet']>>,
    reportClientChannel: (init?: any) =>
      client.POST(apiPaths.reportClientChannelUrl, init) as Promise<
        SDKOperationResponse<operations['reportClientChannel']>
      >,
    requestUserConsent: (deployment_id: string, init?: any) =>
      client.GET(
        apiPaths.requestUserConsentUrl(deployment_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['requestUserConsent']>>,
    revokePerRequestPermissions: (init?: any) =>
      client.POST(apiPaths.revokePerRequestPermissionsUrl, init) as Promise<
        SDKOperationResponse<operations['revokePerRequestPermissions']>
      >,
    revokeSharedResources: (init?: any) =>
      client.POST(apiPaths.revokeSharedResourcesUrl, init) as Promise<
        SDKOperationResponse<operations['revokeSharedResources']>
      >,
    saveConversation: (bucket: string, conversation_path: string, init?: any) =>
      client.PUT(
        apiPaths.saveConversationUrl(bucket, conversation_path) as any,
        init,
      ) as Promise<SDKResponse<ConversationResource>>,
    saveCustomApplication: (
      bucket: string,
      application_path: string,
      init?: any,
    ) =>
      client.PUT(
        apiPaths.saveCustomApplicationUrl(bucket, application_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['saveCustomApplication']>>,
    saveGlobalSettings: (bucket: string, path: string, init?: any) =>
      client.PUT(
        apiPaths.saveGlobalSettingsUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['saveGlobalSettings']>>,
    saveInterceptor: (bucket: string, path: string, init?: any) =>
      client.PUT(
        apiPaths.saveInterceptorUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['saveInterceptor']>>,
    saveKey: (bucket: string, path: string, init?: any) =>
      client.PUT(apiPaths.saveKeyUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['saveKey']>
      >,
    saveModel: (bucket: string, path: string, init?: any) =>
      client.PUT(apiPaths.saveModelUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['saveModel']>
      >,
    savePrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.PUT(
        apiPaths.savePromptUrl(bucket, prompt_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['savePrompt']>>,
    saveRole: (bucket: string, path: string, init?: any) =>
      client.PUT(apiPaths.saveRoleUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['saveRole']>
      >,
    saveRoute: (bucket: string, path: string, init?: any) =>
      client.PUT(apiPaths.saveRouteUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['saveRoute']>
      >,
    saveSchema: (bucket: string, path: string, init?: any) =>
      client.PUT(apiPaths.saveSchemaUrl(bucket, path) as any, init) as Promise<
        SDKOperationResponse<operations['saveSchema']>
      >,
    saveToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.PUT(
        apiPaths.saveToolSetUrl(bucket, toolset_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['saveToolSet']>>,
    sendChatCompletionRequest: (deployment_name: string, init?: any) =>
      client.POST(
        apiPaths.sendChatCompletionRequestUrl(deployment_name) as any,
        init,
      ) as Promise<
        SDKOperationResponse<operations['sendChatCompletionRequest']>
      >,
    shareResource: (init?: any) =>
      client.POST(apiPaths.shareResourceUrl, init) as Promise<
        SDKOperationResponse<operations['shareResource']>
      >,
    subscribeClientChannel: (init?: any) =>
      client.POST(apiPaths.subscribeClientChannelUrl, init) as Promise<
        SDKOperationResponse<operations['subscribeClientChannel']>
      >,
    subscribeToResources: (init?: any) =>
      client.POST(apiPaths.subscribeToResourcesUrl, init) as Promise<
        SDKOperationResponse<operations['subscribeToResources']>
      >,
    tokenize: (deployment_name: string, init?: any) =>
      client.POST(
        apiPaths.tokenizeUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['tokenize']>>,
    toolSetSignout: (init?: any) =>
      client.POST(apiPaths.toolSetSignoutUrl, init) as Promise<
        SDKOperationResponse<operations['toolSetSignout']>
      >,
    toolsetSignin: (init?: any) =>
      client.POST(apiPaths.toolsetSigninUrl, init) as Promise<
        SDKOperationResponse<operations['toolsetSignin']>
      >,
    transferInputFile: (init?: any) =>
      client.POST(apiPaths.transferInputFileUrl, init) as Promise<
        SDKOperationResponse<operations['transferInputFile']>
      >,
    transferOutputFile: (init?: any) =>
      client.POST(apiPaths.transferOutputFileUrl, init) as Promise<
        SDKOperationResponse<operations['transferOutputFile']>
      >,
    truncatePrompt: (deployment_name: string, init?: any) =>
      client.POST(
        apiPaths.truncatePromptUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['truncatePrompt']>>,
    undeployApplication: (init?: any) =>
      client.POST(apiPaths.undeployApplicationUrl, init) as Promise<
        SDKOperationResponse<operations['undeployApplication']>
      >,
    unsubscribeClientChannel: (init?: any) =>
      client.POST(apiPaths.unsubscribeClientChannelUrl, init) as Promise<
        SDKOperationResponse<operations['unsubscribeClientChannel']>
      >,
    updatePublication: (init?: any) =>
      client.POST(apiPaths.updatePublicationUrl, init) as Promise<
        SDKOperationResponse<operations['updatePublication']>
      >,
    uploadFile: (bucket: string, file_path: string, init?: any) =>
      client.PUT(
        apiPaths.uploadFileUrl(bucket, file_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['uploadFile']>>,
    uploadFileToCodeInterpreter: (init?: any) =>
      client.POST(apiPaths.uploadFileToCodeInterpreterUrl, init) as Promise<
        SDKOperationResponse<operations['uploadFileToCodeInterpreter']>
      >,
    uploadSkillFile: (
      bucket: string,
      path: string,
      filepath: string,
      init?: any,
    ) =>
      client.PUT(
        apiPaths.uploadSkillFileUrl(bucket, path, filepath) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['uploadSkillFile']>>,
    uploadSkillFolder: (bucket: string, path: string, init?: any) =>
      client.PUT(
        apiPaths.uploadSkillFolderUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['uploadSkillFolder']>>,
    validateConfigManifests: (init?: any) =>
      client.POST(apiPaths.validateConfigManifestsUrl, init) as Promise<
        SDKOperationResponse<operations['validateConfigManifests']>
      >,
  };
}
