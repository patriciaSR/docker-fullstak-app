import { getOnDataBase } from '../js/service.js';
import { mockTasks } from './fixtures/mockTasks.js';

const ENDPOINT = 'http://localhost/api/misdatos';

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  it('calls ghibli api and returns data to me', () => {
    fetch.mockResponseOnce(JSON.stringify(mockTasks))
     //assert on the response
     getOnDataBase().then(res => {
      expect(res).toEqual(mockTasks)
    })
    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(ENDPOINT)
  });
  test('the fetch fails with an error', () => {
    const failed = new Error('fake error message');
    fetch.mockReject(failed)
    getOnDataBase().catch(e =>
      expect(e).toEqual(failed)
      );
  });
});