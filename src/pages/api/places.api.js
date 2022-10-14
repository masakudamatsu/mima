import {decryptToken} from 'src/utils/iron';

const prisma = require('src/utils/prisma');

export default async function handlePlaces(req, res) {
  let user;
  try {
    user = await decryptToken(req.cookies['api_token']);
    if (!user.userId) {
      throw new Error();
    }
  } catch (error) {
    return res.status(401).json({message: 'User is not logged in.'});
  }
  switch (req.method) {
    case 'POST': {
      const {geometry, properties, type} = req.body;
      try {
        const post = await prisma.place.create({
          data: {
            geometry,
            properties,
            type,
            userId: user.userId,
          },
        });
        res.status(201).json(post);
      } catch (error) {
        console.error(error);
        res.status(500).end(`Database access fails.`);
      }
      break;
    }
    case 'PUT': {
      const {id, properties} = req.body;
      // TODO #281: Abstract the following try-catch block to share PUT and DELETE cases
      try {
        const place = await prisma.place.findUnique({
          where: {
            id,
          },
        });
        if (place.userId !== user.userId) {
          res.status(403).end();
          return;
        }
      } catch (error) {
        console.error(error);
        res.status(500).end('Database access fails.');
        return;
      }
      try {
        const result = await prisma.place.update({
          where: {
            id,
          },
          data: {
            properties,
          },
        });
        res.status(200).json(result);
      } catch (error) {
        console.error(error);
        res.status(500).end(`Database access fails.`);
      }
      break;
    }
    case 'DELETE': {
      const {id} = req.body;
      // TODO #281: Abstract the following try-catch block to share PUT and DELETE cases
      try {
        const place = await prisma.place.findUnique({
          where: {
            id,
          },
        });
        if (place.userId !== user.userId) {
          res.status(403).end();
          return;
        }
      } catch (error) {
        console.error(error);
        res.status(500).end('Database access fails.');
        return;
      }
      try {
        await prisma.place.delete({
          where: {
            id,
          },
        });
        res.json({success: true});
      } catch (error) {
        console.error(error);
        res.status(500).end(`Database access fails.`);
      }
      break;
    }
    default: {
      // Adapted from https://github.com/vercel/next.js/blob/canary/examples/api-routes-rest/pages/api/user/%5Bid%5D.ts
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
    }
  }
}
