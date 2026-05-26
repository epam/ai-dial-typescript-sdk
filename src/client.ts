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
  approvePublication: (
    init: SDKOperationInit<operations['approvePublication']>,
  ) => Promise<SDKOperationResponse<operations['approvePublication']>>;
  callMcp: (
    deployment_id: string,
    init: SDKOperationInit<operations['callMcp']>,
  ) => Promise<SDKOperationResponse<operations['callMcp']>>;
  callToolSet: (
    toolset_name: string,
    init: SDKOperationInit<operations['callToolSet']>,
  ) => Promise<SDKOperationResponse<operations['callToolSet']>>;
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
  createPublication: (
    init?: SDKOperationInit<operations['createPublication']>,
  ) => Promise<SDKOperationResponse<operations['createPublication']>>;
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
  deleteFile: (
    bucket: string,
    file_path: string,
    init?: SDKOperationInit<operations['deleteFile']>,
  ) => Promise<SDKOperationResponse<operations['deleteFile']>>;
  deleteInvitation: (
    invitation_id: string,
    init?: SDKOperationInit<operations['deleteInvitation']>,
  ) => Promise<SDKOperationResponse<operations['deleteInvitation']>>;
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
  deleteToolSet: (
    bucket: string,
    toolset_path: string,
    init?: SDKOperationInit<operations['deleteToolSet']>,
  ) => Promise<SDKOperationResponse<operations['deleteToolSet']>>;
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
  executeCode: (
    init: SDKOperationInit<operations['executeCode']>,
  ) => Promise<SDKOperationResponse<operations['executeCode']>>;
  getAllToolSetAllowedTools: (
    toolset_id: string,
    init?: SDKOperationInit<operations['getAllToolSetAllowedTools']>,
  ) => Promise<SDKOperationResponse<operations['getAllToolSetAllowedTools']>>;
  getAllToolSetTools: (
    toolset_id: string,
    init?: SDKOperationInit<operations['getAllToolSetTools']>,
  ) => Promise<SDKOperationResponse<operations['getAllToolSetTools']>>;
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
  getDeploymentsByInterfaceType: (
    init?: SDKOperationInit<operations['getDeploymentsByInterfaceType']>,
  ) => Promise<
    SDKOperationResponse<operations['getDeploymentsByInterfaceType']>
  >;
  getFileMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getFileMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getFileMetadata']>>;
  getInvitation: (
    invitation_id: string,
    init?: SDKOperationInit<operations['getInvitation']>,
  ) => Promise<SDKOperationResponse<operations['getInvitation']>>;
  getInvitations: (
    init?: SDKOperationInit<operations['getInvitations']>,
  ) => Promise<SDKOperationResponse<operations['getInvitations']>>;
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
  getSession: (
    init: SDKOperationInit<operations['getSession']>,
  ) => Promise<SDKOperationResponse<operations['getSession']>>;
  getSharedResources: (
    init: SDKOperationInit<operations['getSharedResources']>,
  ) => Promise<SDKOperationResponse<operations['getSharedResources']>>;
  getToolSetMetadata: (
    bucket: string,
    path: string,
    init?: SDKOperationInit<operations['getToolSetMetadata']>,
  ) => Promise<SDKOperationResponse<operations['getToolSetMetadata']>>;
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
  interactWithClientChannel: (
    init: SDKOperationInit<operations['interactWithClientChannel']>,
  ) => Promise<SDKOperationResponse<operations['interactWithClientChannel']>>;
  listCustomApplicationSchemas: (
    init?: SDKOperationInit<operations['listCustomApplicationSchemas']>,
  ) => Promise<
    SDKOperationResponse<operations['listCustomApplicationSchemas']>
  >;
  listFilesFromCodeInterpreter: (
    init: SDKOperationInit<operations['listFilesFromCodeInterpreter']>,
  ) => Promise<
    SDKOperationResponse<operations['listFilesFromCodeInterpreter']>
  >;
  moveResource: (
    init: SDKOperationInit<operations['moveResource']>,
  ) => Promise<SDKOperationResponse<operations['moveResource']>>;
  openSession: (
    init: SDKOperationInit<operations['openSession']>,
  ) => Promise<SDKOperationResponse<operations['openSession']>>;
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
  reportResponseToClientChannel: (
    init: SDKOperationInit<operations['reportResponseToClientChannel']>,
  ) => Promise<
    SDKOperationResponse<operations['reportResponseToClientChannel']>
  >;
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
  savePrompt: (
    bucket: string,
    prompt_path: string,
    init: SDKOperationInit<operations['savePrompt']>,
  ) => Promise<SDKOperationResponse<operations['savePrompt']>>;
  saveToolSet: (
    bucket: string,
    toolset_path: string,
    init: SDKOperationInit<operations['saveToolSet']>,
  ) => Promise<SDKOperationResponse<operations['saveToolSet']>>;
  sendChatCompletionRequest: (
    deployment_name: string,
    init: SDKOperationInit<operations['sendChatCompletionRequest']>,
  ) => Promise<SDKOperationResponse<operations['sendChatCompletionRequest']>>;
  sendEmbeddingsRequest: (
    deployment_name: string,
    init: SDKOperationInit<operations['sendEmbeddingsRequest']>,
  ) => Promise<SDKOperationResponse<operations['sendEmbeddingsRequest']>>;
  shareResource: (
    init: SDKOperationInit<operations['shareResource']>,
  ) => Promise<SDKOperationResponse<operations['shareResource']>>;
  subscribeOnClientChannel: (
    init?: SDKOperationInit<operations['subscribeOnClientChannel']>,
  ) => Promise<SDKOperationResponse<operations['subscribeOnClientChannel']>>;
  subscribeToResources: (
    init: SDKOperationInit<operations['subscribeToResources']>,
  ) => Promise<SDKOperationResponse<operations['subscribeToResources']>>;
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
  undeployApplication: (
    init: SDKOperationInit<operations['undeployApplication']>,
  ) => Promise<SDKOperationResponse<operations['undeployApplication']>>;
  unsubscribeOnClientChannel: (
    init: SDKOperationInit<operations['unsubscribeOnClientChannel']>,
  ) => Promise<SDKOperationResponse<operations['unsubscribeOnClientChannel']>>;
  updatePublication: (
    init?: SDKOperationInit<operations['updatePublication']>,
  ) => Promise<SDKOperationResponse<operations['updatePublication']>>;
  uploadFile: (
    bucket: string,
    file_path: string,
    init: SDKOperationInit<operations['uploadFile']>,
  ) => Promise<SDKOperationResponse<operations['uploadFile']>>;
  uploadFileToCodeInterpreter: (
    init: SDKOperationInit<operations['uploadFileToCodeInterpreter']>,
  ) => Promise<SDKOperationResponse<operations['uploadFileToCodeInterpreter']>>;
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
    approvePublication: (init?: any) =>
      client.POST(apiPaths.approvePublicationUrl, init) as Promise<
        SDKOperationResponse<operations['approvePublication']>
      >,
    callMcp: (deployment_id: string, init?: any) =>
      client.POST(apiPaths.callMcpUrl(deployment_id) as any, init) as Promise<
        SDKOperationResponse<operations['callMcp']>
      >,
    callToolSet: (toolset_name: string, init?: any) =>
      client.POST(
        apiPaths.callToolSetUrl(toolset_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['callToolSet']>>,
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
    createPublication: (init?: any) =>
      client.POST(apiPaths.createPublicationUrl, init) as Promise<
        SDKOperationResponse<operations['createPublication']>
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
    deleteFile: (bucket: string, file_path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteFileUrl(bucket, file_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteFile']>>,
    deleteInvitation: (invitation_id: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteInvitationUrl(invitation_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteInvitation']>>,
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
    deleteToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteToolSetUrl(bucket, toolset_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteToolSet']>>,
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
    executeCode: (init?: any) =>
      client.POST(apiPaths.executeCodeUrl, init) as Promise<
        SDKOperationResponse<operations['executeCode']>
      >,
    getAllToolSetAllowedTools: (toolset_id: string, init?: any) =>
      client.GET(
        apiPaths.getAllToolSetAllowedToolsUrl(toolset_id) as any,
        init,
      ) as Promise<
        SDKOperationResponse<operations['getAllToolSetAllowedTools']>
      >,
    getAllToolSetTools: (toolset_id: string, init?: any) =>
      client.GET(
        apiPaths.getAllToolSetToolsUrl(toolset_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getAllToolSetTools']>>,
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
    getDeploymentsByInterfaceType: (init?: any) =>
      client.GET(apiPaths.getDeploymentsByInterfaceTypeUrl, init) as Promise<
        SDKOperationResponse<operations['getDeploymentsByInterfaceType']>
      >,
    getFileMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getFileMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getFileMetadata']>>,
    getInvitation: (invitation_id: string, init?: any) =>
      client.GET(
        apiPaths.getInvitationUrl(invitation_id) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getInvitation']>>,
    getInvitations: (init?: any) =>
      client.GET(apiPaths.getInvitationsUrl, init) as Promise<
        SDKOperationResponse<operations['getInvitations']>
      >,
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
    getSession: (init?: any) =>
      client.POST(apiPaths.getSessionUrl, init) as Promise<
        SDKOperationResponse<operations['getSession']>
      >,
    getSharedResources: (init?: any) =>
      client.POST(apiPaths.getSharedResourcesUrl, init) as Promise<
        SDKOperationResponse<operations['getSharedResources']>
      >,
    getToolSetMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(
        apiPaths.getToolSetMetadataUrl(bucket, path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getToolSetMetadata']>>,
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
    interactWithClientChannel: (init?: any) =>
      client.POST(apiPaths.interactWithClientChannelUrl, init) as Promise<
        SDKOperationResponse<operations['interactWithClientChannel']>
      >,
    listCustomApplicationSchemas: (init?: any) =>
      client.GET(apiPaths.listCustomApplicationSchemasUrl, init) as Promise<
        SDKOperationResponse<operations['listCustomApplicationSchemas']>
      >,
    listFilesFromCodeInterpreter: (init?: any) =>
      client.POST(apiPaths.listFilesFromCodeInterpreterUrl, init) as Promise<
        SDKOperationResponse<operations['listFilesFromCodeInterpreter']>
      >,
    moveResource: (init?: any) =>
      client.POST(apiPaths.moveResourceUrl, init) as Promise<
        SDKOperationResponse<operations['moveResource']>
      >,
    openSession: (init?: any) =>
      client.POST(apiPaths.openSessionUrl, init) as Promise<
        SDKOperationResponse<operations['openSession']>
      >,
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
    reportResponseToClientChannel: (init?: any) =>
      client.POST(apiPaths.reportResponseToClientChannelUrl, init) as Promise<
        SDKOperationResponse<operations['reportResponseToClientChannel']>
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
    savePrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.PUT(
        apiPaths.savePromptUrl(bucket, prompt_path) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['savePrompt']>>,
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
    sendEmbeddingsRequest: (deployment_name: string, init?: any) =>
      client.POST(
        apiPaths.sendEmbeddingsRequestUrl(deployment_name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['sendEmbeddingsRequest']>>,
    shareResource: (init?: any) =>
      client.POST(apiPaths.shareResourceUrl, init) as Promise<
        SDKOperationResponse<operations['shareResource']>
      >,
    subscribeOnClientChannel: (init?: any) =>
      client.POST(apiPaths.subscribeOnClientChannelUrl, init) as Promise<
        SDKOperationResponse<operations['subscribeOnClientChannel']>
      >,
    subscribeToResources: (init?: any) =>
      client.POST(apiPaths.subscribeToResourcesUrl, init) as Promise<
        SDKOperationResponse<operations['subscribeToResources']>
      >,
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
    undeployApplication: (init?: any) =>
      client.POST(apiPaths.undeployApplicationUrl, init) as Promise<
        SDKOperationResponse<operations['undeployApplication']>
      >,
    unsubscribeOnClientChannel: (init?: any) =>
      client.POST(apiPaths.unsubscribeOnClientChannelUrl, init) as Promise<
        SDKOperationResponse<operations['unsubscribeOnClientChannel']>
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
  };
}
