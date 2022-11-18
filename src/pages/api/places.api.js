import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
const prisma = require('src/utils/prisma');
const crypto = require('crypto');

export default withApiAuthRequired(async function handlePlaces(req, res) {
  // retrieve Auth0 user data from cookie
  const {user} = getSession(req, res);
  switch (req.method) {
    case 'POST': {
      const {geometry, properties, type} = req.body;
      const newPlaceId = `place_${crypto.randomUUID()}`; // API ref: https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html#cryptorandomuuidoptions
      const newPlace = {
        id: newPlaceId,
        geometry,
        properties,
        type,
        userId: user.sub,
      };
      try {
        const post = await prisma.place.upsert({
          where: {
            id: newPlaceId,
          },
          create: newPlace,
          update: newPlace, // in case that database access fails AFTER a new place is added to the database; {} won't work in case the user changes place data for the second attempt.
        });
        res.status(201).json(post);
      } catch (error) {
        // TODO #282: send back the newPlaceId so the user's second attempt can include it in the POST request.
        console.error(error);
        res.status(500).end(`Database access fails.`);
      }
      break;
    }
    case 'PUT': {
      const {id, properties} = req.body;
      if (!id) {
        res.status(400).end(`Place ID is missing.`);
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
      if (!id) {
        res.status(400).end(`Place ID is missing.`);
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
});
