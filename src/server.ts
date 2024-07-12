import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";

const app = fastify();

app.register(cors, {
  // url do frontend
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// cadastro de rotas
app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);

app.listen({ port: 3333 }).then(() => {
  console.log(`Server running!`)
})