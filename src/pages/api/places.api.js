const prisma = require('src/utils/prisma');

export default async function handlePlaces(req, res) {
  switch (req.method) {
    case 'POST': {
      const {geometry, properties, type} = req.body;
      const post = await prisma.place.create({
        data: {
          geometry,
          properties,
          type,
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
      break;
    }
  }
}
