export type Service = {
  name: string;
  memo: string;
  roles: string[];
};

export const listServices = async (
  urlFor: (path: string) => URL,
  req: (req: Request) => Promise<Response>,
): Promise<Service[]> => {
  const request = new Request(urlFor("/api/v0/services").toString(), {
    method: "GET",
  });
  const resq = await req(request);
  const services = await resq.json() as { services: Service[] };
  return services["services"];
};
