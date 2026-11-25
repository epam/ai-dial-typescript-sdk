import rawReference from '../data/analytics-reference.json';
import type { ApiReferenceData } from '../data/reference-types';
import ApiReference from './ApiReference';

export default function AnalyticsReference() {
  return (
    <ApiReference reference={rawReference as unknown as ApiReferenceData} />
  );
}
