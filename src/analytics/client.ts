/* eslint-disable no-unused-vars */
import createClient from 'openapi-fetch';

import type { SDKOptions } from '../client';
import type {
  SDKOperationInit,
  SDKOperationResponse,
  SDKOperationTextResponse,
} from '../types';
import * as apiPaths from './api-paths';
import type { operations, paths } from './schema';

/** Methods exposed by `createAnalyticsSDK` (explicit shape avoids TS emit limits on the inferred return type). */
export interface DIAL_ANALYTICS_SDK {
  createDashboard: (
    init: SDKOperationInit<operations['createDashboard']>,
  ) => Promise<SDKOperationResponse<operations['createDashboard']>>;
  createOtelSink: (
    init: SDKOperationInit<operations['createOtelSink']>,
  ) => Promise<SDKOperationResponse<operations['createOtelSink']>>;
  createPipeline: (
    init: SDKOperationInit<operations['createPipeline']>,
  ) => Promise<SDKOperationResponse<operations['createPipeline']>>;
  createSavedQuery: (
    init: SDKOperationInit<operations['createSavedQuery']>,
  ) => Promise<SDKOperationResponse<operations['createSavedQuery']>>;
  createTable: (
    init: SDKOperationInit<operations['createTable']>,
  ) => Promise<SDKOperationResponse<operations['createTable']>>;
  defineTableSchema: (
    name: string,
    init: SDKOperationInit<operations['defineTableSchema']>,
  ) => Promise<SDKOperationResponse<operations['defineTableSchema']>>;
  deleteDashboard: (
    id: string,
    init?: SDKOperationInit<operations['deleteDashboard']>,
  ) => Promise<SDKOperationResponse<operations['deleteDashboard']>>;
  deleteOtelSink: (
    name: string,
    init?: SDKOperationInit<operations['deleteOtelSink']>,
  ) => Promise<SDKOperationResponse<operations['deleteOtelSink']>>;
  deletePipeline: (
    name: string,
    init?: SDKOperationInit<operations['deletePipeline']>,
  ) => Promise<SDKOperationResponse<operations['deletePipeline']>>;
  deleteSavedQuery: (
    id: string,
    init?: SDKOperationInit<operations['deleteSavedQuery']>,
  ) => Promise<SDKOperationResponse<operations['deleteSavedQuery']>>;
  deleteTable: (
    name: string,
    init?: SDKOperationInit<operations['deleteTable']>,
  ) => Promise<SDKOperationResponse<operations['deleteTable']>>;
  deleteTableAccess: (
    name: string,
    init: SDKOperationInit<operations['deleteTableAccess']>,
  ) => Promise<SDKOperationResponse<operations['deleteTableAccess']>>;
  executeQuery: (
    init: SDKOperationInit<operations['executeQuery']>,
  ) => Promise<SDKOperationResponse<operations['executeQuery']>>;
  executeQueryCsv: (
    init: SDKOperationInit<operations['executeQueryCsv']>,
  ) => Promise<SDKOperationTextResponse<operations['executeQueryCsv']>>;
  executeSql: (
    init: SDKOperationInit<operations['executeSql']>,
  ) => Promise<SDKOperationResponse<operations['executeSql']>>;
  executeSqlCsv: (
    init: SDKOperationInit<operations['executeSqlCsv']>,
  ) => Promise<SDKOperationTextResponse<operations['executeSqlCsv']>>;
  exportCatalog: (
    init?: SDKOperationInit<operations['exportCatalog']>,
  ) => Promise<SDKOperationResponse<operations['exportCatalog']>>;
  getActivity: (
    activityId: string,
    init?: SDKOperationInit<operations['getActivity']>,
  ) => Promise<SDKOperationResponse<operations['getActivity']>>;
  getAppRoutes: (
    init?: SDKOperationInit<operations['getAppRoutes']>,
  ) => Promise<SDKOperationResponse<operations['getAppRoutes']>>;
  getBackfillRun: (
    runId: string,
    init?: SDKOperationInit<operations['getBackfillRun']>,
  ) => Promise<SDKOperationResponse<operations['getBackfillRun']>>;
  getDashboard: (
    id: string,
    init?: SDKOperationInit<operations['getDashboard']>,
  ) => Promise<SDKOperationResponse<operations['getDashboard']>>;
  getEntitySchema: (
    name: string,
    init?: SDKOperationInit<operations['getEntitySchema']>,
  ) => Promise<SDKOperationResponse<operations['getEntitySchema']>>;
  getOtelSink: (
    name: string,
    init?: SDKOperationInit<operations['getOtelSink']>,
  ) => Promise<SDKOperationResponse<operations['getOtelSink']>>;
  getPipeline: (
    name: string,
    init?: SDKOperationInit<operations['getPipeline']>,
  ) => Promise<SDKOperationResponse<operations['getPipeline']>>;
  getPipelineRevision: (
    name: string,
    revision: string,
    init?: SDKOperationInit<operations['getPipelineRevision']>,
  ) => Promise<SDKOperationResponse<operations['getPipelineRevision']>>;
  getSavedQuery: (
    id: string,
    init?: SDKOperationInit<operations['getSavedQuery']>,
  ) => Promise<SDKOperationResponse<operations['getSavedQuery']>>;
  getSavedQueryRevision: (
    id: string,
    revision: string,
    init?: SDKOperationInit<operations['getSavedQueryRevision']>,
  ) => Promise<SDKOperationResponse<operations['getSavedQueryRevision']>>;
  getSessionsSource: (
    init?: SDKOperationInit<operations['getSessionsSource']>,
  ) => Promise<SDKOperationResponse<operations['getSessionsSource']>>;
  getTable: (
    name: string,
    init?: SDKOperationInit<operations['getTable']>,
  ) => Promise<SDKOperationResponse<operations['getTable']>>;
  getTableAccess: (
    name: string,
    init?: SDKOperationInit<operations['getTableAccess']>,
  ) => Promise<SDKOperationResponse<operations['getTableAccess']>>;
  getTableRevision: (
    name: string,
    revision: string,
    init?: SDKOperationInit<operations['getTableRevision']>,
  ) => Promise<SDKOperationResponse<operations['getTableRevision']>>;
  importCatalog: (
    init: SDKOperationInit<operations['importCatalog']>,
  ) => Promise<SDKOperationResponse<operations['importCatalog']>>;
  listActivities: (
    init?: SDKOperationInit<operations['listActivities']>,
  ) => Promise<SDKOperationResponse<operations['listActivities']>>;
  listBackfillRuns: (
    init?: SDKOperationInit<operations['listBackfillRuns']>,
  ) => Promise<SDKOperationResponse<operations['listBackfillRuns']>>;
  listDashboards: (
    init?: SDKOperationInit<operations['listDashboards']>,
  ) => Promise<SDKOperationResponse<operations['listDashboards']>>;
  listDataSyncFailures: (
    init?: SDKOperationInit<operations['listDataSyncFailures']>,
  ) => Promise<SDKOperationResponse<operations['listDataSyncFailures']>>;
  listEntities: (
    init?: SDKOperationInit<operations['listEntities']>,
  ) => Promise<SDKOperationResponse<operations['listEntities']>>;
  listOtelSinks: (
    init?: SDKOperationInit<operations['listOtelSinks']>,
  ) => Promise<SDKOperationResponse<operations['listOtelSinks']>>;
  listPipelines: (
    init?: SDKOperationInit<operations['listPipelines']>,
  ) => Promise<SDKOperationResponse<operations['listPipelines']>>;
  listQueryFunctions: (
    init?: SDKOperationInit<operations['listQueryFunctions']>,
  ) => Promise<SDKOperationResponse<operations['listQueryFunctions']>>;
  listSavedQueries: (
    init?: SDKOperationInit<operations['listSavedQueries']>,
  ) => Promise<SDKOperationResponse<operations['listSavedQueries']>>;
  listSqlFunctions: (
    init?: SDKOperationInit<operations['listSqlFunctions']>,
  ) => Promise<SDKOperationResponse<operations['listSqlFunctions']>>;
  listTables: (
    init?: SDKOperationInit<operations['listTables']>,
  ) => Promise<SDKOperationResponse<operations['listTables']>>;
  patchPipeline: (
    name: string,
    init: SDKOperationInit<operations['patchPipeline']>,
  ) => Promise<SDKOperationResponse<operations['patchPipeline']>>;
  patchTableSchema: (
    name: string,
    init: SDKOperationInit<operations['patchTableSchema']>,
  ) => Promise<SDKOperationResponse<operations['patchTableSchema']>>;
  previewCatalogExport: (
    init?: SDKOperationInit<operations['previewCatalogExport']>,
  ) => Promise<SDKOperationResponse<operations['previewCatalogExport']>>;
  previewCatalogImport: (
    init: SDKOperationInit<operations['previewCatalogImport']>,
  ) => Promise<SDKOperationResponse<operations['previewCatalogImport']>>;
  previewPipeline: (
    name: string,
    init?: SDKOperationInit<operations['previewPipeline']>,
  ) => Promise<SDKOperationResponse<operations['previewPipeline']>>;
  refreshPipeline: (
    name: string,
    init?: SDKOperationInit<operations['refreshPipeline']>,
  ) => Promise<SDKOperationResponse<operations['refreshPipeline']>>;
  replaceAppRoutes: (
    init: SDKOperationInit<operations['replaceAppRoutes']>,
  ) => Promise<SDKOperationResponse<operations['replaceAppRoutes']>>;
  replaceDashboard: (
    id: string,
    init: SDKOperationInit<operations['replaceDashboard']>,
  ) => Promise<SDKOperationResponse<operations['replaceDashboard']>>;
  replaceSavedQuery: (
    id: string,
    init: SDKOperationInit<operations['replaceSavedQuery']>,
  ) => Promise<SDKOperationResponse<operations['replaceSavedQuery']>>;
  replaceSessionsSource: (
    init: SDKOperationInit<operations['replaceSessionsSource']>,
  ) => Promise<SDKOperationResponse<operations['replaceSessionsSource']>>;
  replaceTableAccess: (
    name: string,
    init: SDKOperationInit<operations['replaceTableAccess']>,
  ) => Promise<SDKOperationResponse<operations['replaceTableAccess']>>;
  requeueDataSyncFailures: (
    init: SDKOperationInit<operations['requeueDataSyncFailures']>,
  ) => Promise<SDKOperationResponse<operations['requeueDataSyncFailures']>>;
  translateQuery: (
    init: SDKOperationInit<operations['translateQuery']>,
  ) => Promise<SDKOperationResponse<operations['translateQuery']>>;
  translateSql: (
    init: SDKOperationInit<operations['translateSql']>,
  ) => Promise<SDKOperationResponse<operations['translateSql']>>;
  triggerBackfill: (
    init: SDKOperationInit<operations['triggerBackfill']>,
  ) => Promise<SDKOperationResponse<operations['triggerBackfill']>>;
  updateTable: (
    name: string,
    init: SDKOperationInit<operations['updateTable']>,
  ) => Promise<SDKOperationResponse<operations['updateTable']>>;
  validateSql: (
    init: SDKOperationInit<operations['validateSql']>,
  ) => Promise<SDKOperationResponse<operations['validateSql']>>;
  writeTableRows: (
    name: string,
    init: SDKOperationInit<operations['writeTableRows']>,
  ) => Promise<SDKOperationResponse<operations['writeTableRows']>>;
}

export function createAnalyticsSDK(opts: SDKOptions): DIAL_ANALYTICS_SDK {
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
    createDashboard: (init?: any) =>
      client.POST(apiPaths.createDashboardUrl, init) as Promise<
        SDKOperationResponse<operations['createDashboard']>
      >,
    createOtelSink: (init?: any) =>
      client.POST(apiPaths.createOtelSinkUrl, init) as Promise<
        SDKOperationResponse<operations['createOtelSink']>
      >,
    createPipeline: (init?: any) =>
      client.POST(apiPaths.createPipelineUrl, init) as Promise<
        SDKOperationResponse<operations['createPipeline']>
      >,
    createSavedQuery: (init?: any) =>
      client.POST(apiPaths.createSavedQueryUrl, init) as Promise<
        SDKOperationResponse<operations['createSavedQuery']>
      >,
    createTable: (init?: any) =>
      client.POST(apiPaths.createTableUrl, init) as Promise<
        SDKOperationResponse<operations['createTable']>
      >,
    defineTableSchema: (name: string, init?: any) =>
      client.POST(apiPaths.defineTableSchemaUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['defineTableSchema']>
      >,
    deleteDashboard: (id: string, init?: any) =>
      client.DELETE(apiPaths.deleteDashboardUrl(id) as any, init) as Promise<
        SDKOperationResponse<operations['deleteDashboard']>
      >,
    deleteOtelSink: (name: string, init?: any) =>
      client.DELETE(apiPaths.deleteOtelSinkUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['deleteOtelSink']>
      >,
    deletePipeline: (name: string, init?: any) =>
      client.DELETE(apiPaths.deletePipelineUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['deletePipeline']>
      >,
    deleteSavedQuery: (id: string, init?: any) =>
      client.DELETE(apiPaths.deleteSavedQueryUrl(id) as any, init) as Promise<
        SDKOperationResponse<operations['deleteSavedQuery']>
      >,
    deleteTable: (name: string, init?: any) =>
      client.DELETE(apiPaths.deleteTableUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['deleteTable']>
      >,
    deleteTableAccess: (name: string, init?: any) =>
      client.DELETE(
        apiPaths.deleteTableAccessUrl(name) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['deleteTableAccess']>>,
    executeQuery: (init?: any) =>
      client.POST(apiPaths.executeQueryUrl, init) as Promise<
        SDKOperationResponse<operations['executeQuery']>
      >,
    executeQueryCsv: (init?: any) =>
      client.POST(apiPaths.executeQueryCsvUrl, {
        parseAs: 'text',
        ...init,
      }) as Promise<SDKOperationTextResponse<operations['executeQueryCsv']>>,
    executeSql: (init?: any) =>
      client.POST(apiPaths.executeSqlUrl, init) as Promise<
        SDKOperationResponse<operations['executeSql']>
      >,
    executeSqlCsv: (init?: any) =>
      client.POST(apiPaths.executeSqlCsvUrl, {
        parseAs: 'text',
        ...init,
      }) as Promise<SDKOperationTextResponse<operations['executeSqlCsv']>>,
    exportCatalog: (init?: any) =>
      client.POST(apiPaths.exportCatalogUrl, init) as Promise<
        SDKOperationResponse<operations['exportCatalog']>
      >,
    getActivity: (activityId: string, init?: any) =>
      client.GET(apiPaths.getActivityUrl(activityId) as any, init) as Promise<
        SDKOperationResponse<operations['getActivity']>
      >,
    getAppRoutes: (init?: any) =>
      client.GET(apiPaths.getAppRoutesUrl, init) as Promise<
        SDKOperationResponse<operations['getAppRoutes']>
      >,
    getBackfillRun: (runId: string, init?: any) =>
      client.GET(apiPaths.getBackfillRunUrl(runId) as any, init) as Promise<
        SDKOperationResponse<operations['getBackfillRun']>
      >,
    getDashboard: (id: string, init?: any) =>
      client.GET(apiPaths.getDashboardUrl(id) as any, init) as Promise<
        SDKOperationResponse<operations['getDashboard']>
      >,
    getEntitySchema: (name: string, init?: any) =>
      client.GET(apiPaths.getEntitySchemaUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getEntitySchema']>
      >,
    getOtelSink: (name: string, init?: any) =>
      client.GET(apiPaths.getOtelSinkUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getOtelSink']>
      >,
    getPipeline: (name: string, init?: any) =>
      client.GET(apiPaths.getPipelineUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getPipeline']>
      >,
    getPipelineRevision: (name: string, revision: string, init?: any) =>
      client.GET(
        apiPaths.getPipelineRevisionUrl(name, revision) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getPipelineRevision']>>,
    getSavedQuery: (id: string, init?: any) =>
      client.GET(apiPaths.getSavedQueryUrl(id) as any, init) as Promise<
        SDKOperationResponse<operations['getSavedQuery']>
      >,
    getSavedQueryRevision: (id: string, revision: string, init?: any) =>
      client.GET(
        apiPaths.getSavedQueryRevisionUrl(id, revision) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getSavedQueryRevision']>>,
    getSessionsSource: (init?: any) =>
      client.GET(apiPaths.getSessionsSourceUrl, init) as Promise<
        SDKOperationResponse<operations['getSessionsSource']>
      >,
    getTable: (name: string, init?: any) =>
      client.GET(apiPaths.getTableUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getTable']>
      >,
    getTableAccess: (name: string, init?: any) =>
      client.GET(apiPaths.getTableAccessUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['getTableAccess']>
      >,
    getTableRevision: (name: string, revision: string, init?: any) =>
      client.GET(
        apiPaths.getTableRevisionUrl(name, revision) as any,
        init,
      ) as Promise<SDKOperationResponse<operations['getTableRevision']>>,
    importCatalog: (init?: any) =>
      client.POST(apiPaths.importCatalogUrl, init) as Promise<
        SDKOperationResponse<operations['importCatalog']>
      >,
    listActivities: (init?: any) =>
      client.POST(apiPaths.listActivitiesUrl, init) as Promise<
        SDKOperationResponse<operations['listActivities']>
      >,
    listBackfillRuns: (init?: any) =>
      client.GET(apiPaths.listBackfillRunsUrl, init) as Promise<
        SDKOperationResponse<operations['listBackfillRuns']>
      >,
    listDashboards: (init?: any) =>
      client.GET(apiPaths.listDashboardsUrl, init) as Promise<
        SDKOperationResponse<operations['listDashboards']>
      >,
    listDataSyncFailures: (init?: any) =>
      client.GET(apiPaths.listDataSyncFailuresUrl, init) as Promise<
        SDKOperationResponse<operations['listDataSyncFailures']>
      >,
    listEntities: (init?: any) =>
      client.GET(apiPaths.listEntitiesUrl, init) as Promise<
        SDKOperationResponse<operations['listEntities']>
      >,
    listOtelSinks: (init?: any) =>
      client.GET(apiPaths.listOtelSinksUrl, init) as Promise<
        SDKOperationResponse<operations['listOtelSinks']>
      >,
    listPipelines: (init?: any) =>
      client.GET(apiPaths.listPipelinesUrl, init) as Promise<
        SDKOperationResponse<operations['listPipelines']>
      >,
    listQueryFunctions: (init?: any) =>
      client.GET(apiPaths.listQueryFunctionsUrl, init) as Promise<
        SDKOperationResponse<operations['listQueryFunctions']>
      >,
    listSavedQueries: (init?: any) =>
      client.GET(apiPaths.listSavedQueriesUrl, init) as Promise<
        SDKOperationResponse<operations['listSavedQueries']>
      >,
    listSqlFunctions: (init?: any) =>
      client.GET(apiPaths.listSqlFunctionsUrl, init) as Promise<
        SDKOperationResponse<operations['listSqlFunctions']>
      >,
    listTables: (init?: any) =>
      client.GET(apiPaths.listTablesUrl, init) as Promise<
        SDKOperationResponse<operations['listTables']>
      >,
    patchPipeline: (name: string, init?: any) =>
      client.PATCH(apiPaths.patchPipelineUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['patchPipeline']>
      >,
    patchTableSchema: (name: string, init?: any) =>
      client.PATCH(apiPaths.patchTableSchemaUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['patchTableSchema']>
      >,
    previewCatalogExport: (init?: any) =>
      client.POST(apiPaths.previewCatalogExportUrl, init) as Promise<
        SDKOperationResponse<operations['previewCatalogExport']>
      >,
    previewCatalogImport: (init?: any) =>
      client.POST(apiPaths.previewCatalogImportUrl, init) as Promise<
        SDKOperationResponse<operations['previewCatalogImport']>
      >,
    previewPipeline: (name: string, init?: any) =>
      client.POST(apiPaths.previewPipelineUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['previewPipeline']>
      >,
    refreshPipeline: (name: string, init?: any) =>
      client.POST(apiPaths.refreshPipelineUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['refreshPipeline']>
      >,
    replaceAppRoutes: (init?: any) =>
      client.PUT(apiPaths.replaceAppRoutesUrl, init) as Promise<
        SDKOperationResponse<operations['replaceAppRoutes']>
      >,
    replaceDashboard: (id: string, init?: any) =>
      client.PUT(apiPaths.replaceDashboardUrl(id) as any, init) as Promise<
        SDKOperationResponse<operations['replaceDashboard']>
      >,
    replaceSavedQuery: (id: string, init?: any) =>
      client.PUT(apiPaths.replaceSavedQueryUrl(id) as any, init) as Promise<
        SDKOperationResponse<operations['replaceSavedQuery']>
      >,
    replaceSessionsSource: (init?: any) =>
      client.PUT(apiPaths.replaceSessionsSourceUrl, init) as Promise<
        SDKOperationResponse<operations['replaceSessionsSource']>
      >,
    replaceTableAccess: (name: string, init?: any) =>
      client.PUT(apiPaths.replaceTableAccessUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['replaceTableAccess']>
      >,
    requeueDataSyncFailures: (init?: any) =>
      client.POST(apiPaths.requeueDataSyncFailuresUrl, init) as Promise<
        SDKOperationResponse<operations['requeueDataSyncFailures']>
      >,
    translateQuery: (init?: any) =>
      client.POST(apiPaths.translateQueryUrl, init) as Promise<
        SDKOperationResponse<operations['translateQuery']>
      >,
    translateSql: (init?: any) =>
      client.POST(apiPaths.translateSqlUrl, init) as Promise<
        SDKOperationResponse<operations['translateSql']>
      >,
    triggerBackfill: (init?: any) =>
      client.POST(apiPaths.triggerBackfillUrl, init) as Promise<
        SDKOperationResponse<operations['triggerBackfill']>
      >,
    updateTable: (name: string, init?: any) =>
      client.PUT(apiPaths.updateTableUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['updateTable']>
      >,
    validateSql: (init?: any) =>
      client.POST(apiPaths.validateSqlUrl, init) as Promise<
        SDKOperationResponse<operations['validateSql']>
      >,
    writeTableRows: (name: string, init?: any) =>
      client.POST(apiPaths.writeTableRowsUrl(name) as any, init) as Promise<
        SDKOperationResponse<operations['writeTableRows']>
      >,
  };
}
