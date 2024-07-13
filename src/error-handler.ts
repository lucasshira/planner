import { FastifyInstance } from "fastify"
import { ClientError } from "./errors/client-error"
import { ZodError } from "zod"

type FastfiyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastfiyErrorHandler = (error, request, reply) => {
  console.log(error)
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Invalid input',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof ClientError) {
    return reply.status(400).send({
      message: error.message
    })
  }

  return reply.status(500).send({ message: 'Internal server error' })
}