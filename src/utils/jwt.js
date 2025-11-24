import jwt from "jsonwebtoken";

/**
 * Sign a JWT for a user.
 * Payload includes id + role for authorization.
 */
export const signToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};
