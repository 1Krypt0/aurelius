/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "Aurelius": {
      "type": "sst.aws.SvelteKit"
      "url": string
    }
    "Uploads": {
      "name": string
      "type": "sst.aws.Bucket"
    }
  }
}
export {}
