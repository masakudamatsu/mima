// mocking
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

// function to test
import handlePlaces from 'src/pages/api/places.api';

// test helpers
import {encryptSession} from 'src/utils/iron';
import Iron from '@hapi/iron';
const mockUserId = getToken();

// mocking
const {prismaMock} = require('test/utils/prismaMock');

describe('api/places: happy path', () => {
  it('handles POST requests correctly', async () => {
    const newPlace = buildPlace({userId: undefined});

    const req = buildReq({
      method: 'POST',
      body: newPlace,
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();

    prismaMock.place.create.mockResolvedValue({
      ...newPlace,
      userId: mockUserId,
    });

    await handlePlaces(req, res);

    expect(prismaMock.place.create).toHaveBeenCalledWith({
      data: {...newPlace, userId: mockUserId},
    });
    expect(prismaMock.place.create).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith({...newPlace, userId: mockUserId});
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  it('handles PUT requests correctly', async () => {
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
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();

    prismaMock.place.findUnique.mockResolvedValue(savedPlace);

    prismaMock.place.update.mockResolvedValue({
      ...updatedPlace,
      userId: mockUserId,
    });

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

    expect(res.json).toHaveBeenCalledWith({
      ...updatedPlace,
      userId: mockUserId,
    });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('handles DELETE requests correctly', async () => {
    const savedPlace = buildPlace({id: getId(), userId: mockUserId});

    const req = buildReq({
      method: 'DELETE',
      body: {
        id: savedPlace.id,
      },
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();
    prismaMock.place.findUnique.mockResolvedValue(savedPlace);

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

describe('/api/place: sad path on session token', () => {
  it('handles the absence of any cookie in the request', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: undefined,
    });
    const res = buildRes();

    await handlePlaces(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "User is not logged in.",
  },
]
`);
  });
  it('handles the absence of api_token in the request', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: undefined,
      },
    });
    const res = buildRes();

    await handlePlaces(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "User is not logged in.",
  },
]
`);
  });
  it('handles a session token encrypted with a wrong secret', async () => {
    const wrongSecret =
      '112bd40c41c4ad291a8a8e1820de1703d4c1c3f2f4c2ed9e460a9586e5f8f0f6';
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: await Iron.seal({mockUserId}, wrongSecret, Iron.defaults),
      },
    });
    const res = buildRes();

    await handlePlaces(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "User is not logged in.",
  },
]
`);
  });
  it('handles the absence of user ID in the session token', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: await encryptSession({userId: null}),
      },
    });
    const res = buildRes();

    await handlePlaces(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "User is not logged in.",
  },
]
`);
  });
  it('handles invalid request methods', async () => {
    const req = buildReq({
      method: getWord().toUpperCase(),
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
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

describe('/api/places: sad path on database query', () => {
  // Mock console.error, to supress error messages in the console;
  // For tests expected to call console.error, we check if it's called only for the expected # of times;
  // If this assertion fails, there must be an error in the code.
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    console.error.mockRestore();
  });
  it('handles database access failure for adding a place', async () => {
    const newPlace = buildPlace({userId: undefined});

    const req = buildReq({
      method: 'POST',
      body: newPlace,
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();

    prismaMock.place.create.mockRejectedValue(new Error());

    await handlePlaces(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "Database access fails.",
]
`);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('handles database access failure for updating a place info', async () => {
    const savedPlace = buildPlace({id: getId(), userId: mockUserId});
    const updates = {
      properties: {
        name: getPlaceName(),
        note: [getNote(), getNote()],
      },
    };

    const req = buildReq({
      method: 'PUT',
      body: {
        id: savedPlace.id,
        ...updates,
      },
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();
    prismaMock.place.findUnique.mockResolvedValue(savedPlace);

    prismaMock.place.update.mockRejectedValue(new Error());

    await handlePlaces(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "Database access fails.",
]
`);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('handles database access failure for checking user ID before updating a place info', async () => {
    const savedPlace = buildPlace({id: getId(), userId: mockUserId});
    const updates = {
      properties: {
        name: getPlaceName(),
        note: [getNote(), getNote()],
      },
    };

    const req = buildReq({
      method: 'PUT',
      body: {
        id: savedPlace.id,
        ...updates,
      },
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();

    prismaMock.place.findUnique.mockRejectedValue(new Error());

    await handlePlaces(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "Database access fails.",
]
`);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('handles database access failure for deleting a place', async () => {
    const savedPlace = buildPlace({id: getId(), userId: mockUserId});

    const req = buildReq({
      method: 'DELETE',
      body: {
        id: savedPlace.id,
      },
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();

    prismaMock.place.delete.mockRejectedValue(new Error());

    await handlePlaces(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "Database access fails.",
]
`);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});

describe('/api/places: sad path on wrong user ID', () => {
  it('prevents place info updating by a different user', async () => {
    const savedPlace = buildPlace({id: getId(), userId: mockUserId});
    // simulate hacking
    const wrongUserId = getToken();
    const updates = {
      properties: {
        name: getPlaceName(),
        note: [getNote(), getNote()],
      },
    };
    const req = buildReq({
      method: 'PUT',
      body: {
        id: savedPlace.id,
        ...updates,
      },
      cookies: {
        api_token: await encryptSession({userId: wrongUserId}),
      },
    });
    const res = buildRes();
    prismaMock.place.findUnique.mockResolvedValue(savedPlace);

    await handlePlaces(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.status).toHaveBeenCalledTimes(1);
  });
  it('prevents place deletion by a wrong user', async () => {
    const savedPlace = buildPlace({id: getId(), userId: mockUserId});
    // simulate hacking
    const wrongUserId = getToken();
    const req = buildReq({
      method: 'DELETE',
      body: {
        id: savedPlace.id,
      },
      cookies: {
        api_token: await encryptSession({userId: wrongUserId}),
      },
    });
    const res = buildRes();
    prismaMock.place.findUnique.mockResolvedValue(savedPlace);

    await handlePlaces(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.status).toHaveBeenCalledTimes(1);
  });
});
