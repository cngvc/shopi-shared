import { Client } from '@elastic/elasticsearch';
import {
  CountResponse,
  QueryDslQueryContainer,
  SearchRequest,
  SearchResponse,
} from '@elastic/elasticsearch/lib/api/types';
import { createLogger } from './logger.helper';
import { NotFoundError } from '../responses/error-handler';
import dotenv from 'dotenv';
dotenv.config({});

export type QueryListType = QueryDslQueryContainer | QueryDslQueryContainer[];

const { log, logCatch } = createLogger(
  'Elastic search',
  `${process.env.ELASTIC_SEARCH_URL}`
);

export class ElasticSearch {
  private elasticSearchClient: Client;
  constructor(private readonly elasticSearchUrl: string) {
    this.elasticSearchClient = new Client({ node: elasticSearchUrl });
  }
  async checkConnection(): Promise<void> {
    let isConnected = false;
    while (!isConnected) {
      try {
        const health = await this.elasticSearchClient.cluster.health({});
        log.info(`Elasticsearch health status - ${health.status}`);
        isConnected = true;
      } catch (error) {
        logCatch(
          error,
          'checkConnection, connection to elasticsearch failed, retrying'
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
  private async checkIfIndexExist(indexName: string): Promise<boolean> {
    return await this.elasticSearchClient.indices.exists({ index: indexName });
  }
  async getDocumentCount(index: string): Promise<number> {
    try {
      const result: CountResponse = await this.elasticSearchClient.count({
        index,
      });
      return result.count;
    } catch (error) {
      logCatch(error, 'getDocumentCount');
      return 0;
    }
  }
  async getIndexedData<T>(index: string, identifier: string): Promise<T> {
    try {
      const result = await this.elasticSearchClient.get({
        index,
        id: identifier,
      });
      return result?._source as T;
    } catch (error) {
      logCatch(error, 'createIndex');
      throw new NotFoundError('Item not found', 'getIndexedData method');
    }
  }
  async createIndex(indexName: string): Promise<void> {
    try {
      const exists = await this.checkIfIndexExist(indexName);
      if (!exists) {
        await this.elasticSearchClient.indices.create({ index: indexName });
        await this.elasticSearchClient.indices.refresh({ index: indexName });
        log.info(`Created index ${indexName}.`);
      } else {
        log.info(`Index "${indexName}" already exists.`);
      }
    } catch (error) {
      logCatch(error, 'createIndex');
    }
  }
  async addItemToIndex<T>(
    index: string,
    itemId: string,
    doc: T
  ): Promise<void> {
    try {
      log.info(`Adding new document to index ${index}`);
      await this.elasticSearchClient.index({
        index,
        id: itemId,
        document: doc,
      });
    } catch (error) {
      logCatch(error, 'addItemToIndex');
    }
  }
  async updateIndexedItem<T>(
    index: string,
    itemId: string,
    doc: Partial<T>
  ): Promise<void> {
    try {
      await this.elasticSearchClient.update({
        index,
        id: itemId,
        doc,
      });
    } catch (error) {
      logCatch(error, 'updateIndexedItem');
    }
  }
  async deleteIndexedItem(index: string, itemId: string): Promise<void> {
    try {
      await this.elasticSearchClient.delete({
        index,
        id: itemId,
      });
    } catch (error) {
      logCatch(error, 'deleteIndexedItem');
    }
  }
  async search(
    index: string,
    queryList: QueryListType,
    params?: Omit<SearchRequest, 'index' | 'query'>
  ): Promise<SearchResponse> {
    return await this.elasticSearchClient.search({
      index,
      query: {
        bool: {
          must: queryList,
        },
      },
      ...params,
    });
  }
}
