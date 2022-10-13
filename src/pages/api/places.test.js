import {
  buildPlace,
  buildReq,
  buildRes,
  getId,
  getNote,
  getPlaceName,
  getWord,
} from 'test/utils/generate';
import handlePlaces from 'src/pages/api/places.api';

const {prismaMock} = require('test/utils/prismaMock');

describe('api/places', () => {
  test('handles POST requests correctly', async () => {
    const newPlace = buildPlace();

    const req = buildReq({method: 'POST', body: newPlace});
    const res = buildRes();

    prismaMock.place.create.mockResolvedValue(newPlace);

    await handlePlaces(req, res);

    expect(prismaMock.place.create).toHaveBeenCalledWith({data: newPlace});
    expect(prismaMock.place.create).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith(newPlace);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  test('handles PUT requests correctly', async () => {
    const savedPlace = buildPlace({id: getId()});
    const updates = {
      properties: {
        name: getPlaceName(),
        note: [getNote(), getNote()],
      },
    };
    const updatedPlace = {
      ...savedPlace,
      ...updates,
    };

    const req = buildReq({
      method: 'PUT',
      body: {
        id: savedPlace.id,
        ...updates,
      },
    });
    const res = buildRes();

    prismaMock.place.update.mockResolvedValue(updatedPlace);

    await handlePlaces(req, res);

    expect(prismaMock.place.update).toHaveBeenCalledWith({
      where: {
        id: savedPlace.id,
      },
      data: updates,
    });
    expect(prismaMock.place.update).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith(updatedPlace);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test('handles DELETE requests correctly', async () => {
    const savedPlace = buildPlace({id: getId()});

    const req = buildReq({
      method: 'DELETE',
      body: {
        id: savedPlace.id,
      },
    });
    const res = buildRes();

    await handlePlaces(req, res);

    expect(prismaMock.place.delete).toHaveBeenCalledWith({
      where: {
        id: savedPlace.id,
      },
    });
    expect(prismaMock.place.delete).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith({success: true});
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test('handles invalid request methods', async () => {
    const req = buildReq({
      method: getWord().toUpperCase(),
    });
    const res = buildRes({
      setHeader: jest.fn().mockName('res.setHeader'),
    });
    await handlePlaces(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.setHeader).toHaveBeenCalledWith('Allow', [
      'POST',
      'PUT',
      'DELETE',
    ]);
    expect(res.setHeader).toHaveBeenCalledTimes(1);
    expect(res.end).toHaveBeenCalledWith(`Method ${req.method} Not Allowed`);
    expect(res.end).toHaveBeenCalledTimes(1);
  });
});
