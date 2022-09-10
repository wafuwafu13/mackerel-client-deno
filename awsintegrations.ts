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

type AWSIntegrationService = {
  enable: boolean;
  role: string | null;
  excludeMetrics: string[];
  retireAutomatically?: boolean;
};

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
