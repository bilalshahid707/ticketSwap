export const natsWrapper = {
  client: {
    publish: jest.fn().mockImplementation((subject, data, callback) => {
      callback(); // simulate successful publish
    }),
  },
};
