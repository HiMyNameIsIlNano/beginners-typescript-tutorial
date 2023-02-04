import { expect, it } from "vitest";
import { string } from 'zod';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}


type createUserType = () => Promise<string>;
type getUserType = (id: string) => Promise<User>;

const createThenGetUser = async (
  createUser: createUserType,
  getUser: getUserType,
): Promise<User> => {
  const userId: string = await createUser();

  const user = await getUser(userId);

  return user;
};

it("Should create the user, then get them", async () => {
  const user = await createThenGetUser(
    async () => "123",
    async (id) => ({
      id,
      firstName: "Matt",
      lastName: "Pocock",
    }),
  );

  expect(user).toEqual({
    id: "123",
    firstName: "Matt",
    lastName: "Pocock",
  });
});
