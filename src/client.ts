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
      client.POST(apiPaths.acceptUserConsent(deployment_id) as any, init),
    approvePublication: (init?: any) => client.POST(apiPaths.approvePublication, init),
    callToolSet: (toolset_name: string, init?: any) =>
      client.POST(apiPaths.callToolSet(toolset_name) as any, init),
    closeSession: (init?: any) => client.POST(apiPaths.closeSession, init),
    configurationDeployment: (deployment_name: string, init?: any) =>
      client.GET(apiPaths.configurationDeployment(deployment_name) as any, init),
    copyResource: (init?: any) => client.POST(apiPaths.copyResource, init),
    copySharedResources: (init?: any) => client.POST(apiPaths.copySharedResources, init),
    createPublication: (init?: any) => client.POST(apiPaths.createPublication, init),
    deleteConversation: (bucket: string, conversation_path: string, init?: any) =>
      client.DELETE(apiPaths.deleteConversation(bucket, conversation_path) as any, init),
    deleteCustomApplication: (bucket: string, application_path: string, init?: any) =>
      client.DELETE(apiPaths.deleteCustomApplication(bucket, application_path) as any, init),
    deleteFile: (bucket: string, file_path: string, init?: any) =>
      client.DELETE(apiPaths.deleteFile(bucket, file_path) as any, init),
    deleteInvitation: (invitation_id: string, init?: any) =>
      client.DELETE(apiPaths.deleteInvitation(invitation_id) as any, init),
    deleteNotifications: (init?: any) => client.POST(apiPaths.deleteNotifications, init),
    deletePrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.DELETE(apiPaths.deletePrompt(bucket, prompt_path) as any, init),
    deletePublication: (init?: any) => client.POST(apiPaths.deletePublication, init),
    deleteToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.DELETE(apiPaths.deleteToolSet(bucket, toolset_path) as any, init),
    deployApplication: (init?: any) => client.POST(apiPaths.deployApplication, init),
    discardSharedResources: (init?: any) => client.POST(apiPaths.discardSharedResources, init),
    downloadFile: (bucket: string, file_path: string, init?: any) =>
      client.GET(apiPaths.downloadFile(bucket, file_path) as any, init),
    downloadFileFromCodeInterpreter: (init?: any) => client.POST(apiPaths.downloadFileFromCodeInterpreter, init),
    executeCode: (init?: any) => client.POST(apiPaths.executeCode, init),
    getApplication: (application_name: string, init?: any) =>
      client.GET(apiPaths.getApplication(application_name) as any, init),
    getApplicationLogs: (init?: any) => client.POST(apiPaths.getApplicationLogs, init),
    getApplicationMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getApplicationMetadata(bucket, path) as any, init),
    getApplications: (init?: any) => client.GET(apiPaths.getApplications, init),
    getConversation: (bucket: string, conversation_path: string, init?: any) =>
      client.GET(apiPaths.getConversation(bucket, conversation_path) as any, init),
    getConversationMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getConversationMetadata(bucket, path) as any, init),
    getCustomApplication: (bucket: string, application_path: string, init?: any) =>
      client.GET(apiPaths.getCustomApplication(bucket, application_path) as any, init),
    getCustomApplicationSchema: (init?: any) => client.GET(apiPaths.getCustomApplicationSchema, init),
    getCustomToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.GET(apiPaths.getCustomToolSet(bucket, toolset_path) as any, init),
    getDeployment: (deployment_name: string, init?: any) =>
      client.GET(apiPaths.getDeployment(deployment_name) as any, init),
    getDeploymentLimits: (deployment_name: string, init?: any) =>
      client.GET(apiPaths.getDeploymentLimits(deployment_name) as any, init),
    getDeployments: (init?: any) => client.GET(apiPaths.getDeployments, init),
    getFileMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getFileMetadata(bucket, path) as any, init),
    getInvitation: (invitation_id: string, init?: any) =>
      client.GET(apiPaths.getInvitation(invitation_id) as any, init),
    getInvitations: (init?: any) => client.GET(apiPaths.getInvitations, init),
    getMetaSchemaOfCustomApplicationSchema: (init?: any) => client.GET(apiPaths.getMetaSchemaOfCustomApplicationSchema, init),
    getModel: (model_name: string, init?: any) =>
      client.GET(apiPaths.getModel(model_name) as any, init),
    getModels: (init?: any) => client.GET(apiPaths.getModels, init),
    getNotifications: (init?: any) => client.POST(apiPaths.getNotifications, init),
    getPerRequestPermissions: (init?: any) => client.POST(apiPaths.getPerRequestPermissions, init),
    getPrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.GET(apiPaths.getPrompt(bucket, prompt_path) as any, init),
    getPromptMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getPromptMetadata(bucket, path) as any, init),
    getPublication: (init?: any) => client.POST(apiPaths.getPublication, init),
    getPublicationRules: (init?: any) => client.POST(apiPaths.getPublicationRules, init),
    getPublications: (init?: any) => client.POST(apiPaths.getPublications, init),
    getSession: (init?: any) => client.POST(apiPaths.getSession, init),
    getSharedResources: (init?: any) => client.POST(apiPaths.getSharedResources, init),
    getToolSetMetadata: (bucket: string, path: string, init?: any) =>
      client.GET(apiPaths.getToolSetMetadata(bucket, path) as any, init),
    getToolSets: (init?: any) => client.GET(apiPaths.getToolSets, init),
    getToolset: (toolset_name: string, init?: any) =>
      client.GET(apiPaths.getToolset(toolset_name) as any, init),
    getUserBucket: (init?: any) => client.GET(apiPaths.getUserBucket, init),
    getUserInfo: (init?: any) => client.GET(apiPaths.getUserInfo, init),
    grantPerRequestPermissions: (init?: any) => client.POST(apiPaths.grantPerRequestPermissions, init),
    listCustomApplicationSchemas: (init?: any) => client.GET(apiPaths.listCustomApplicationSchemas, init),
    listFilesFromCodeInterpreter: (init?: any) => client.POST(apiPaths.listFilesFromCodeInterpreter, init),
    moveResource: (init?: any) => client.POST(apiPaths.moveResource, init),
    openSession: (init?: any) => client.POST(apiPaths.openSession, init),
    rateDeployment: (deployment_name: string, init?: any) =>
      client.POST(apiPaths.rateDeployment(deployment_name) as any, init),
    redeployApplication: (init?: any) => client.POST(apiPaths.redeployApplication, init),
    rejectPublication: (init?: any) => client.POST(apiPaths.rejectPublication, init),
    reloadConfig: (init?: any) => client.POST(apiPaths.reloadConfig, init),
    requestUserConsent: (deployment_id: string, init?: any) =>
      client.GET(apiPaths.requestUserConsent(deployment_id) as any, init),
    revokePerRequestPermissions: (init?: any) => client.POST(apiPaths.revokePerRequestPermissions, init),
    revokeSharedResources: (init?: any) => client.POST(apiPaths.revokeSharedResources, init),
    saveConversation: (bucket: string, conversation_path: string, init?: any) =>
      client.PUT(apiPaths.saveConversation(bucket, conversation_path) as any, init),
    saveCustomApplication: (bucket: string, application_path: string, init?: any) =>
      client.PUT(apiPaths.saveCustomApplication(bucket, application_path) as any, init),
    savePrompt: (bucket: string, prompt_path: string, init?: any) =>
      client.PUT(apiPaths.savePrompt(bucket, prompt_path) as any, init),
    saveToolSet: (bucket: string, toolset_path: string, init?: any) =>
      client.PUT(apiPaths.saveToolSet(bucket, toolset_path) as any, init),
    sendChatCompletionRequest: (deployment_name: string, init?: any) =>
      client.POST(apiPaths.sendChatCompletionRequest(deployment_name) as any, init),
    sendEmbeddingsRequest: (deployment_name: string, init?: any) =>
      client.POST(apiPaths.sendEmbeddingsRequest(deployment_name) as any, init),
    shareResource: (init?: any) => client.POST(apiPaths.shareResource, init),
    subscribeToResources: (init?: any) => client.POST(apiPaths.subscribeToResources, init),
    toolSetSignout: (init?: any) => client.POST(apiPaths.toolSetSignout, init),
    toolsetSignin: (init?: any) => client.POST(apiPaths.toolsetSignin, init),
    transferInputFile: (init?: any) => client.POST(apiPaths.transferInputFile, init),
    transferOutputFile: (init?: any) => client.POST(apiPaths.transferOutputFile, init),
    undeployApplication: (init?: any) => client.POST(apiPaths.undeployApplication, init),
    updatePublication: (init?: any) => client.POST(apiPaths.updatePublication, init),
    uploadFile: (bucket: string, file_path: string, init?: any) =>
      client.PUT(apiPaths.uploadFile(bucket, file_path) as any, init),
    uploadFileToCodeInterpreter: (init?: any) => client.POST(apiPaths.uploadFileToCodeInterpreter, init),
  };
}
