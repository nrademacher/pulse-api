ARG node_version=14.17.5
ARG node_image=node:${node_version}-alpine

# STAGE 1
FROM $node_image as builder

WORKDIR /builder/

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --no-progress

COPY . ./

RUN yarn prisma:generate
RUN yarn codegen:generate

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

COPY --from=builder /builder/package.json ./
COPY --from=production /production/node_modules ./node_modules
COPY --from=builder /builder/dist ./dist
COPY --from=builder /builder/.env /builder/prisma/schema.prisma  ./

RUN yarn prisma:generate
RUN yarn prisma:migrate:prod

CMD yarn start
