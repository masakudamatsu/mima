import {getServerSideProps} from 'src/pages/index.page';

// test helpers
import {buildPlace, buildReq, getId, getToken} from 'test/utils/generate';
import {encryptSession} from 'src/utils/iron';

// mocking
const {prismaMock} = require('test/utils/prismaMock');

describe('getServerSideProps', () => {
  it(`happy path: returns logged-in user's place data as props`, async () => {
    // mock request
    const mockUserId = getToken();
    const req = buildReq({
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    // mock data
    let savedPlace1, savedPlace2;
    prismaMock.place.findMany.mockImplementation(({where}) => {
      savedPlace1 = buildPlace({id: getId(), userId: where.userId});
      savedPlace2 = buildPlace({id: getId(), userId: where.userId});
      return [savedPlace1, savedPlace2];
    });

    // execute
    const response = await getServerSideProps({req});

    // verify
    expect(response).toEqual({
      props: {savedPlaces: [savedPlace1, savedPlace2]},
    });
    expect(savedPlace1.userId).toBe(mockUserId);
    expect(savedPlace2.userId).toBe(mockUserId);
  });
  it(`sad path: redirects to login page if user isn't logged in`, async () => {
    const req = buildReq();

    // execute
    const response = await getServerSideProps({req});

    // verify
    expect(response).toEqual({
      redirect: {
        destination: '/login',
        permanent: false,
      },
    });
  });
  it(`sad path: redirects to login page if a session token misses user ID`, async () => {
    const req = buildReq({
      cookies: {
        api_token: await encryptSession(null),
      },
    });

    // execute
    const response = await getServerSideProps({req});

    // verify
    expect(response).toEqual({
      redirect: {
        destination: '/login',
        permanent: false,
      },
    });
  });
  it('sad path: returns an error as props if database access fails', async () => {
    // mock request
    const mockUserId = getToken();
    const req = buildReq({
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    // mock database access failure
    prismaMock.place.findMany.mockRejectedValueOnce(new Error());

    // execute
    const response = await getServerSideProps({req});

    // verify
    expect(response).toEqual({
      props: {savedPlaces: null, error: true},
    });
  });
});
