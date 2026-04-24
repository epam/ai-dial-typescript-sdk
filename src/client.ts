/* eslint-disable no-unused-vars */
import createClient from 'openapi-fetch';

import * as apiPaths from './api-paths';
import type { paths } from './schema';

export interface SDKOptions {
  baseUrl: string;
  apiKey?: string;
  token?: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}

/** Methods exposed by `createSDK` (explicit shape avoids TS emit limits on the inferred return type). */
export interface DIAL_SDK {
  acceptUserConsent: (deployment_id: string, init?: any) => Promise<unknown>;
  approvePublication: (init?: any) => Promise<unknown>;
  callToolSet: (toolset_name: string, init?: any) => Promise<unknown>;
  closeSession: (init?: any) => Promise<unknown>;
  configurationDeployment: (deployment_name: string, init?: any) => Promise<unknown>;
  copyResource: (init?: any) => Promise<unknown>;
  copySharedResources: (init?: any) => Promise<unknown>;
  createPublication: (init?: any) => Promise<unknown>;
  deleteConversation: (bucket: string, conversation_path: string, init?: any) => Promise<unknown>;
  deleteCustomApplication: (bucket: string, application_path: string, init?: any) => Promise<unknown>;
  deleteFile: (bucket: string, file_path: string, init?: any) => Promise<unknown>;
  deleteInvitation: (invitation_id: string, init?: any) => Promise<unknown>;
  deleteNotifications: (init?: any) => Promise<unknown>;
  deletePrompt: (bucket: string, prompt_path: string, init?: any) => Promise<unknown>;
  deletePublication: (init?: any) => Promise<unknown>;
  deleteToolSet: (bucket: string, toolset_path: string, init?: any) => Promise<unknown>;
  deployApplication: (init?: any) => Promise<unknown>;
  discardSharedResources: (init?: any) => Promise<unknown>;
  downloadFile: (bucket: string, file_path: string, init?: any) => Promise<unknown>;
  downloadFileFromCodeInterpreter: (init?: any) => Promise<unknown>;
  executeCode: (init?: any) => Promise<unknown>;
  getApplication: (application_name: string, init?: any) => Promise<unknown>;
  getApplicationLogs: (init?: any) => Promise<unknown>;
  getApplicationMetadata: (bucket: string, path: string, init?: any) => Promise<unknown>;
  getApplications: (init?: any) => Promise<unknown>;
  getConversation: (bucket: string, conversation_path: string, init?: any) => Promise<unknown>;
  getConversationMetadata: (bucket: string, path: string, init?: any) => Promise<unknown>;
  getCustomApplication: (bucket: string, application_path: string, init?: any) => Promise<unknown>;
  getCustomApplicationSchema: (init?: any) => Promise<unknown>;
  getCustomToolSet: (bucket: string, toolset_path: string, init?: any) => Promise<unknown>;
  getDeployment: (deployment_name: string, init?: any) => Promise<unknown>;
  getDeploymentLimits: (deployment_name: string, init?: any) => Promise<unknown>;
  getDeployments: (init?: any) => Promise<unknown>;
  getFileMetadata: (bucket: string, path: string, init?: any) => Promise<unknown>;
  getInvitation: (invitation_id: string, init?: any) => Promise<unknown>;
  getInvitations: (init?: any) => Promise<unknown>;
  getMetaSchemaOfCustomApplicationSchema: (init?: any) => Promise<unknown>;
  getModel: (model_name: string, init?: any) => Promise<unknown>;
  getModels: (init?: any) => Promise<unknown>;
  getNotifications: (init?: any) => Promise<unknown>;
  getPerRequestPermissions: (init?: any) => Promise<unknown>;
  getPrompt: (bucket: string, prompt_path: string, init?: any) => Promise<unknown>;
  getPromptMetadata: (bucket: string, path: string, init?: any) => Promise<unknown>;
  getPublication: (init?: any) => Promise<unknown>;
  getPublicationRules: (init?: any) => Promise<unknown>;
  getPublications: (init?: any) => Promise<unknown>;
  getSession: (init?: any) => Promise<unknown>;
  getSharedResources: (init?: any) => Promise<unknown>;
  getToolSetMetadata: (bucket: string, path: string, init?: any) => Promise<unknown>;
  getToolSets: (init?: any) => Promise<unknown>;
  getToolset: (toolset_name: string, init?: any) => Promise<unknown>;
  getUserBucket: (init?: any) => Promise<unknown>;
  getUserInfo: (init?: any) => Promise<unknown>;
  grantPerRequestPermissions: (init?: any) => Promise<unknown>;
  listCustomApplicationSchemas: (init?: any) => Promise<unknown>;
  listFilesFromCodeInterpreter: (init?: any) => Promise<unknown>;
  moveResource: (init?: any) => Promise<unknown>;
  openSession: (init?: any) => Promise<unknown>;
  rateDeployment: (deployment_name: string, init?: any) => Promise<unknown>;
  redeployApplication: (init?: any) => Promise<unknown>;
  rejectPublication: (init?: any) => Promise<unknown>;
  reloadConfig: (init?: any) => Promise<unknown>;
  requestUserConsent: (deployment_id: string, init?: any) => Promise<unknown>;
  revokePerRequestPermissions: (init?: any) => Promise<unknown>;
  revokeSharedResources: (init?: any) => Promise<unknown>;
  saveConversation: (bucket: string, conversation_path: string, init?: any) => Promise<unknown>;
  saveCustomApplication: (bucket: string, application_path: string, init?: any) => Promise<unknown>;
  savePrompt: (bucket: string, prompt_path: string, init?: any) => Promise<unknown>;
  saveToolSet: (bucket: string, toolset_path: string, init?: any) => Promise<unknown>;
  sendChatCompletionRequest: (deployment_name: string, init?: any) => Promise<unknown>;
  sendEmbeddingsRequest: (deployment_name: string, init?: any) => Promise<unknown>;
  shareResource: (init?: any) => Promise<unknown>;
  subscribeToResources: (init?: any) => Promise<unknown>;
  toolSetSignout: (init?: any) => Promise<unknown>;
  toolsetSignin: (init?: any) => Promise<unknown>;
  transferInputFile: (init?: any) => Promise<unknown>;
  transferOutputFile: (init?: any) => Promise<unknown>;
  undeployApplication: (init?: any) => Promise<unknown>;
  updatePublication: (init?: any) => Promise<unknown>;
  uploadFile: (bucket: string, file_path: string, init?: any) => Promise<unknown>;
  uploadFileToCodeInterpreter: (init?: any) => Promise<unknown>;
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
      client.POST(apiPaths.acceptUserConsentUrl(deployment_id) as any, init),
    approvePublication: (init?: any) => client.POST(apiPaths.approvePublicationUrl, init),
    callToolSet: (toolset_name: string, init?: any) =>
      client.POST(apiPaths.callToolSetUrl(toolset_name) as any, init),
    closeSession: (init?: any) => client.POST(apiPaths.closeSessionUrl, init),
    configurationDeployment: (deployment_name: string, init?: any) =>
      client.GET(apiPaths.configurationDeploymentUrl(deployment_name) as any, init),
    copyResource: (init?: any) => client.POST(apiPaths.copyResourceUrl, init),
    copySharedResources: (init?: any) => client.POST(apiPaths.copySharedResourcesUrl, init),
    createPublication: (init?: any) => client.POST(apiPaths.createPublicationUrl, init),
    deleteConversation: (bucket: string, conversation_path: string, init?: any) =>
      client.DELETE(apiPaths.deleteConversationUrl(bucket, conversation_path) as any, init),
    deleteCustomApplication: (bucket: string, application_path: string, init?: any) =>
      client.DELETE(apiPaths.deleteCustomApplicationUrl(bucket, application_path) as any, init),
    deleteFile: (bucket: string, file_path: string, init?: any) =>
      client.DELETE(apiPaths.deleteFileUrl(bucket, file_path) as any, init),
    deleteInvitation: (invitation_id: string, init?: any) =>
      client.DELETE(apiPaths.deleteInvitationUrl(invitation_id) as any, init),
    deleteNotifications: (init?: any) => client.POST(apiPaths.deleteNotificationsUrl, init),
    deletePrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.DELETE(apiPaths.deletePromptUrl(bucket, prompt_path) as any, init),
    deletePublication: (init?: any) => client.POST(apiPaths.deletePublicationUrl, init),
    deleteToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.DELETE(apiPaths.deleteToolSetUrl(bucket, toolset_path) as any, init),
    deployApplication: (init?: any) => client.POST(apiPaths.deployApplicationUrl, init),
    discardSharedResources: (init?: any) => client.POST(apiPaths.discardSharedResourcesUrl, init),
    downloadFile: (bucket: string, file_path: string, init?: any) =>
      client.GET(apiPaths.downloadFileUrl(bucket, file_path) as any, init),
    downloadFileFromCodeInterpreter: (init?: any) => client.POST(apiPaths.downloadFileFromCodeInterpreterUrl, init),
    executeCode: (init?: any) => client.POST(apiPaths.executeCodeUrl, init),
    getApplication: (application_name: string, init?: any) =>
      client.GET(apiPaths.getApplicationUrl(application_name) as any, init),
    getApplicationLogs: (init?: any) => client.POST(apiPaths.getApplicationLogsUrl, init),
    getApplicationMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getApplicationMetadataUrl(bucket, path) as any, init),
    getApplications: (init?: any) => client.GET(apiPaths.getApplicationsUrl, init),
    getConversation: (bucket: string, conversation_path: string, init?: any) =>
      client.GET(apiPaths.getConversationUrl(bucket, conversation_path) as any, init),
    getConversationMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getConversationMetadataUrl(bucket, path) as any, init),
    getCustomApplication: (bucket: string, application_path: string, init?: any) =>
      client.GET(apiPaths.getCustomApplicationUrl(bucket, application_path) as any, init),
    getCustomApplicationSchema: (init?: any) => client.GET(apiPaths.getCustomApplicationSchemaUrl, init),
    getCustomToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.GET(apiPaths.getCustomToolSetUrl(bucket, toolset_path) as any, init),
    getDeployment: (deployment_name: string, init?: any) =>
      client.GET(apiPaths.getDeploymentUrl(deployment_name) as any, init),
    getDeploymentLimits: (deployment_name: string, init?: any) =>
      client.GET(apiPaths.getDeploymentLimitsUrl(deployment_name) as any, init),
    getDeployments: (init?: any) => client.GET(apiPaths.getDeploymentsUrl, init),
    getFileMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getFileMetadataUrl(bucket, path) as any, init),
    getInvitation: (invitation_id: string, init?: any) =>
      client.GET(apiPaths.getInvitationUrl(invitation_id) as any, init),
    getInvitations: (init?: any) => client.GET(apiPaths.getInvitationsUrl, init),
    getMetaSchemaOfCustomApplicationSchema: (init?: any) => client.GET(apiPaths.getMetaSchemaOfCustomApplicationSchemaUrl, init),
    getModel: (model_name: string, init?: any) =>
      client.GET(apiPaths.getModelUrl(model_name) as any, init),
    getModels: (init?: any) => client.GET(apiPaths.getModelsUrl, init),
    getNotifications: (init?: any) => client.POST(apiPaths.getNotificationsUrl, init),
    getPerRequestPermissions: (init?: any) => client.POST(apiPaths.getPerRequestPermissionsUrl, init),
    getPrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.GET(apiPaths.getPromptUrl(bucket, prompt_path) as any, init),
    getPromptMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getPromptMetadataUrl(bucket, path) as any, init),
    getPublication: (init?: any) => client.POST(apiPaths.getPublicationUrl, init),
    getPublicationRules: (init?: any) => client.POST(apiPaths.getPublicationRulesUrl, init),
    getPublications: (init?: any) => client.POST(apiPaths.getPublicationsUrl, init),
    getSession: (init?: any) => client.POST(apiPaths.getSessionUrl, init),
    getSharedResources: (init?: any) => client.POST(apiPaths.getSharedResourcesUrl, init),
    getToolSetMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getToolSetMetadataUrl(bucket, path) as any, init),
    getToolSets: (init?: any) => client.GET(apiPaths.getToolSetsUrl, init),
    getToolset: (toolset_name: string, init?: any) =>
      client.GET(apiPaths.getToolsetUrl(toolset_name) as any, init),
    getUserBucket: (init?: any) => client.GET(apiPaths.getUserBucketUrl, init),
    getUserInfo: (init?: any) => client.GET(apiPaths.getUserInfoUrl, init),
    grantPerRequestPermissions: (init?: any) => client.POST(apiPaths.grantPerRequestPermissionsUrl, init),
    listCustomApplicationSchemas: (init?: any) => client.GET(apiPaths.listCustomApplicationSchemasUrl, init),
    listFilesFromCodeInterpreter: (init?: any) => client.POST(apiPaths.listFilesFromCodeInterpreterUrl, init),
    moveResource: (init?: any) => client.POST(apiPaths.moveResourceUrl, init),
    openSession: (init?: any) => client.POST(apiPaths.openSessionUrl, init),
    rateDeployment: (deployment_name: string, init?: any) =>
      client.POST(apiPaths.rateDeploymentUrl(deployment_name) as any, init),
    redeployApplication: (init?: any) => client.POST(apiPaths.redeployApplicationUrl, init),
    rejectPublication: (init?: any) => client.POST(apiPaths.rejectPublicationUrl, init),
    reloadConfig: (init?: any) => client.POST(apiPaths.reloadConfigUrl, init),
    requestUserConsent: (deployment_id: string, init?: any) =>
      client.GET(apiPaths.requestUserConsentUrl(deployment_id) as any, init),
    revokePerRequestPermissions: (init?: any) => client.POST(apiPaths.revokePerRequestPermissionsUrl, init),
    revokeSharedResources: (init?: any) => client.POST(apiPaths.revokeSharedResourcesUrl, init),
    saveConversation: (bucket: string, conversation_path: string, init?: any) =>
      client.PUT(apiPaths.saveConversationUrl(bucket, conversation_path) as any, init),
    saveCustomApplication: (bucket: string, application_path: string, init?: any) =>
      client.PUT(apiPaths.saveCustomApplicationUrl(bucket, application_path) as any, init),
    savePrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.PUT(apiPaths.savePromptUrl(bucket, prompt_path) as any, init),
    saveToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.PUT(apiPaths.saveToolSetUrl(bucket, toolset_path) as any, init),
    sendChatCompletionRequest: (deployment_name: string, init?: any) =>
      client.POST(apiPaths.sendChatCompletionRequestUrl(deployment_name) as any, init),
    sendEmbeddingsRequest: (deployment_name: string, init?: any) =>
      client.POST(apiPaths.sendEmbeddingsRequestUrl(deployment_name) as any, init),
    shareResource: (init?: any) => client.POST(apiPaths.shareResourceUrl, init),
    subscribeToResources: (init?: any) => client.POST(apiPaths.subscribeToResourcesUrl, init),
    toolSetSignout: (init?: any) => client.POST(apiPaths.toolSetSignoutUrl, init),
    toolsetSignin: (init?: any) => client.POST(apiPaths.toolsetSigninUrl, init),
    transferInputFile: (init?: any) => client.POST(apiPaths.transferInputFileUrl, init),
    transferOutputFile: (init?: any) => client.POST(apiPaths.transferOutputFileUrl, init),
    undeployApplication: (init?: any) => client.POST(apiPaths.undeployApplicationUrl, init),
    updatePublication: (init?: any) => client.POST(apiPaths.updatePublicationUrl, init),
    uploadFile: (bucket: string, file_path: string, init?: any) =>
      client.PUT(apiPaths.uploadFileUrl(bucket, file_path) as any, init),
    uploadFileToCodeInterpreter: (init?: any) => client.POST(apiPaths.uploadFileToCodeInterpreterUrl, init),
  };
}
