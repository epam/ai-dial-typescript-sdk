import rawReference from '../data/api-reference.json';
import type { ApiReferenceData } from '../data/reference-types';
import ApiReference from './ApiReference';

export default function CoreReference() {
  return (
    <ApiReference reference={rawReference as unknown as ApiReferenceData} />
  );
}
