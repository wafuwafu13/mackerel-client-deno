import { PayloadType } from "./mackerel.ts";

export type AWSIntegration = {
  id: string;
  name: string;
  memo: string;
  key: string | null;
  roleArn: string | null;
  externalID: string | null;
  region: string;
  includedTags: string;
  excludedTags: string;
  services: Record<string, AWSIntegrationService>;
};

export type AWSIntegrationService = {
  enable: boolean;
  role: string | null;
  excludedMetrics: string[];
  retireAutomatically?: boolean;
};

export type RegisterAWSIntegrationParam = {
  name: string;
  memo: string;
  key: string | null;
  secretKey: string | null;
  roleArn: string | null;
  externalId: string | null;
  region: string;
  includedTags: string;
  excludedTags: string;
  services: Record<string, AWSIntegrationService>;
};

export type UpdateAWSIntegrationParam =
  & Partial<RegisterAWSIntegrationParam>
  & Pick<
    RegisterAWSIntegrationParam,
    "name" | "memo" | "region" | "includedTags" | "excludedTags" | "services"
  >;

export const listAwsIntegrationSettings = async (
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response | Error>,
): Promise<AWSIntegration[]> => {
  const request = new Request(urlFor("/api/v0/aws-integrations").toString(), {
    method: "GET",
  });
  const resp = await req(request);
  if (resp instanceof Error) {
    throw resp;
  }
  const awsIntegrations = await resp.json() as {
    aws_integrations: AWSIntegration[];
  };
  return awsIntegrations["aws_integrations"];
};

export const getAwsIntegrationSettings = async (
  awsIntegrationID: string,
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response | Error>,
): Promise<AWSIntegration> => {
  const request = new Request(
    urlFor(`/api/v0/aws-integrations/${awsIntegrationID}`).toString(),
    {
      method: "GET",
    },
  );
  const resp = await req(request);
  if (resp instanceof Error) {
    throw resp;
  }
  const awsIntegration = await resp.json() as AWSIntegration;
  return awsIntegration;
};

export const registerAwsIntegrationSettings = async (
  param: RegisterAWSIntegrationParam,
  postJSON: (
    path: string,
    payload: PayloadType,
  ) => Promise<Response | Error>,
): Promise<AWSIntegration> => {
  const resp = await postJSON("/api/v0/aws-integrations", param);
  if (resp instanceof Error) {
    throw resp;
  }
  const awsIntegration = await resp.json() as AWSIntegration;
  return awsIntegration;
};

export const updateAwsIntegrationSettings = async (
  awsIntegrationID: string,
  param: UpdateAWSIntegrationParam,
  putJSON: (
    path: string,
    payload: PayloadType,
  ) => Promise<Response | Error>,
): Promise<AWSIntegration> => {
  const resp = await putJSON(
    `/api/v0/aws-integrations/${awsIntegrationID}`,
    param,
  );
  if (resp instanceof Error) {
    throw resp;
  }
  const awsIntegration = await resp.json() as AWSIntegration;
  return awsIntegration;
};

export const deleteAwsIntegrationSettings = async (
  awsIntegrationID: string,
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response | Error>,
): Promise<AWSIntegration> => {
  const request = new Request(
    urlFor(`/api/v0/aws-integrations/${awsIntegrationID}`).toString(),
    {
      method: "DELETE",
    },
  );
  request.headers.set("Content-Type", "application/json");
  const resp = await req(request);
  if (resp instanceof Error) {
    throw resp;
  }
  const awsIntegration = await resp.json() as AWSIntegration;
  return awsIntegration;
};

export const generateAwsIntegrationExternalID = async (
  postJSON: (
    path: string,
    payload: PayloadType,
  ) => Promise<Response | Error>,
): Promise<string> => {
  const resp = await postJSON("/api/v0/aws-integrations-external-id", null);
  if (resp instanceof Error) {
    throw resp;
  }
  const externalId = await resp.json() as { externalId: string };
  return externalId["externalId"];
};
