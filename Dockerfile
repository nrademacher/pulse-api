ARG node_version=14.17.5
ARG node_image=node:${node_version}-alpine

# STAGE 1
FROM $node_image as builder

ENV DB_HOST=postgres

WORKDIR /builder/

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --no-progress

COPY . ./

RUN yarn prismix
RUN yarn prisma:generate
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

ENV DB_HOST=postgres
ENV DB_ENV=prod

WORKDIR /server/

COPY --from=builder /builder/package.json /builder/.env ./
COPY --from=production /production/node_modules ./node_modules
COPY --from=builder /builder/dist ./dist
COPY --from=builder /builder/prisma/ ./

RUN yarn prisma:generate

CMD yarn deploy
