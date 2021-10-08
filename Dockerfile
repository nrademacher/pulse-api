ARG node_version=14.17.8
ARG node_image=node:${node_version}-alpine

# STAGE 1
FROM $node_image as builder

WORKDIR /builder/

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --no-progress

COPY . ./

RUN yarn prisma
RUN yarn codegen
RUN yarn build

# STAGE 2
FROM $node_image as production

WORKDIR /production/

COPY --from=builder /builder/package.json /builder/yarn.lock ./
COPY --from=builder /builder/yarn.lock ./

RUN yarn install --frozen-lockfile --production=true --no-progress

# STAGE 3
FROM $node_image

WORKDIR /server/

COPY --from=builder /builder/package.json /builder/.env ./
COPY --from=production /production/node_modules ./node_modules
COPY --from=builder /builder/dist ./dist

RUN mkdir -p prisma/migrations

COPY --from=builder /builder/prisma/schema.prisma ./prisma
COPY --from=builder /builder/prisma/migrations ./prisma

RUN yarn prisma:migrate:prod
RUN yarn prisma:generate

CMD yarn start
