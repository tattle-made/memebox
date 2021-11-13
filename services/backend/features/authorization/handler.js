const { web_app_url } = require("../../config");
const { StatusCodes } = require("http-status-codes");
const { validateSignupPayload } = require("./validator");

class Handler {
  async signUpNewUser(req, res) {
    try {
      const { email, password } = req.body;
      const validatedPayload = await validateSignupPayload({ email, password });
      const newUser = await create(validatedPayload);

      sendEmail({
        subject: "Email Verification for memebox",
        body: `Please complete your registration by visiting this link ${web_app_url}/app/email-verification?token=${newUser.verificationToken}`,
        receiver: newUser.email,
      });

      response
        .status(StatusCodes.OK)
        .send({ message: "Please check your email to complete registration" });
    } catch (err) {
      console.log("Error Signing up User ", err);
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }

  async verifyEmail(req, res) {
    const { token } = req.query;

    try {
      const user = await verifyToken({ verificationToken: token });
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await addToken({ token: refreshToken });
      response
        .status(StatusCodes.OK)
        .send({ ...user.getPublicProfile(), accessToken, refreshToken });
    } catch (error) {
      console.log("Error : Could not verify token");
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await findByEmailPassword({ email, password });

      if (user.status === "verified") {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await addToken({ token: refreshToken });

        response
          .status(StatusCodes.OK)
          .send({ ...user.getPublicProfile(), accessToken, refreshToken });
      } else {
        response.status(StatusCodes.OK).send({
          message: `This user is not allowed to login because they are ${user.status}`,
        });
      }
    } catch (error) {
      console.log("Error : Could not login user ", error);
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not login user" });
    }
  }

  async refreshToken(req, res) {
    const { token } = req.body;
    if (token === undefined) {
      response.status(StatusCodes.BAD_REQUEST);
    }

    const isTokenValid = await isValid(token);
    if (!isTokenValid) {
      response
        .status(StatusCodes.FORBIDDEN)
        .send({ error: "User is not permitted to do this operation" });
    }

    try {
      const userData = await verifyRefreshToken(token);
      const user = {
        getPublicProfile: () => ({
          id: userData.id,
          username: userData.username,
          role: userData.role,
        }),
      };
      const accessToken = generateAccessToken(user);
      response.status(StatusCodes.OK).send({ accessToken });
    } catch (error) {
      console.log("Error : could not refresh token", error);
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not refresh token" });
    }
  }

  async logoutUser(req, res) {
    const { token } = requestBody;
    try {
      await removeToken({ token });
      response.status(StatusCodes.OK).send({ message: "token refreshed" });
    } catch (error) {
      console.log("Error : Could not refresh token", error);
      throw new Error("Could not refresh token");
    }
  }
}

module.exports = {
  Handler,
};
