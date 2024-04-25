export const config = { path: '/user-loc' };
export default async (request, context) => {
	// Get the location header from the request
	return Response.json(
		{
			...context.geo,
			ip: context.ip
		},
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,OPTIONS'
			}
		}
	);
};
