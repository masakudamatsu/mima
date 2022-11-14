import {
  buildPlace,
  buildReq,
  buildRes,
  getId,
  getNote,
  getPlaceName,
  getToken,
  getWord,
} from 'test/utils/generate';
import handlePlaces from 'src/pages/api/places.api';

const {prismaMock} = require('test/utils/prismaMock');

const mockUserId = getToken();

jest.mock('@auth0/nextjs-auth0', () => {
  const originalModule = jest.requireActual('@auth0/nextjs-auth0');
  return {
    ...originalModule,
    getSession: () => {
      return {
        user: {
          sub: mockUserId,
        },
      };
    },
    withApiAuthRequired: handler => handler,
  };
});

describe('Happy path for /api/places', () => {
  test('handles POST requests correctly', async () => {
    const newPlace = buildPlace();

    const req = buildReq({method: 'POST', body: newPlace});
    const res = buildRes();

    prismaMock.place.create.mockResolvedValue(newPlace);

    await handlePlaces(req, res);

    expect(prismaMock.place.create).toHaveBeenCalledWith({
      data: {...newPlace, userId: mockUserId},
    });
    expect(prismaMock.place.create).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith(newPlace);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  test('handles PUT requests correctly', async () => {
    const savedPlace = buildPlace({id: getId(), userId: mockUserId});
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
    const savedPlace = buildPlace({id: getId(), userId: mockUserId});

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
});

describe('Sad paths for requests to /api/places', () => {
  test('handles invalid request methods', async () => {
    const req = buildReq({
      method: getWord().toUpperCase(),
    });
    const res = buildRes();
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
