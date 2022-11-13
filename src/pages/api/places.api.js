import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
const prisma = require('src/utils/prisma');

export default withApiAuthRequired(async function handlePlaces(req, res) {
  // retrieve Auth0 user data from cookie
  const {user} = getSession(req, res);
  switch (req.method) {
    case 'POST': {
      const {geometry, properties, type} = req.body;
      const post = await prisma.place.create({
        data: {
          geometry,
          properties,
          type,
          userId: user.sub,
        },
      });
      res.status(201).json(post);
      break;
    }
    case 'PUT': {
      const {id, properties} = req.body;
      const result = await prisma.place.update({
        where: {
          id,
        },
        data: {
          properties,
        },
      });
      res.status(200).json(result);
      break;
    }
    case 'DELETE': {
      const {id} = req.body;
      await prisma.place.delete({
        where: {
          id,
        },
      });
      res.json({success: true});
      break;
    }
    default: {
      // Adapted from https://github.com/vercel/next.js/blob/canary/examples/api-routes-rest/pages/api/user/%5Bid%5D.ts
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
    }
  }
});
