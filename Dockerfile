ARG node_version=14.17.5
ARG node_image=node:${node_version}-alpine

# STAGE 1
FROM $node_image as builder

WORKDIR /server/

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --no-progress

COPY . ./

RUN yarn build

# STAGE 2
FROM $node_image as production

WORKDIR /server/

COPY --from=builder /server/package.json /server/yarn.lock ./
COPY --from=builder /server/yarn.lock ./

RUN yarn install --frozen-lockfile --production=true --no-progress

# STAGE 3
FROM $node_image

WORKDIR /server/

COPY --from=production /server/node_modules ./node_modules
COPY --from=builder /server/dist /server/package.json ./
COPY --from=builder /server/.env /server/prisma/schema.prisma  ./

RUN npx prisma generate

CMD yarn start

