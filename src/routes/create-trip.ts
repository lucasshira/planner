import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import dayjs from 'dayjs';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/trips', {
    schema: {
      body: z.object({
        destination: z.string().min(4),
        // converte o tipo do campo que esta vindo para o tipo Date
        starts_at: z.coerce.date(),
        ends_at: z.coerce.date(),
        owner_name: z.string(),
        // passando .email() o zod vai validar o email automaticamente
        owner_email: z.string().email(),
      })
    }
  }, async (request) => {
    const { destination, starts_at, ends_at, owner_name, owner_email } = request.body;

    if (dayjs(starts_at).isBefore(new Date())) {
      throw new Error('Invalid trip start date.');
    }

    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new Error('Invalid trip end date.');
    }

    // como trip e participants se relacionam, posso usar a criacao de uma trip juntamente com a criacao de um participant
    const trip = await prisma.trip.create({
      data: {
        destination,
        starts_at,
        ends_at,
        participants: {
          create: {
            name: owner_name,
            email: owner_email,
            is_owner: true,
            is_confirmed: true,
          }
        }
      },
      include: {
        participants: true,
      }
    })
    
    const mail = await getMailClient();

    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'oi@planner.com',
      },
      to: {
        name: owner_name,
        address: owner_email,
      },
      subject: 'Testando envio do e-mail',
      html: `<p>Teste do envio de e-mail</p>`
    })

    console.log(nodemailer.getTestMessageUrl(message));
    
    return { tripId: trip.id }
  });
}